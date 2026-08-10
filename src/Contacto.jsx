import React, { useState, useRef, useMemo, useEffect, useId, useCallback } from 'react';
import { listaPaises, prefijoDe, ciudadesDe } from './datos/paises.js';
import { validarCampo, validarTodo, PROYECTOS, METODOS_CONTACTO } from './lib/validarLead.js';
import { enviarLead, estaConfigurado, TURNSTILE_SITE_KEY, ErrorDeEnvio } from './lib/enviarLead.js';

const CAL_LINK = import.meta.env.VITE_CAL_LINK || '';

/* Rellena {nombre} y {correo} en las cadenas de i18n */
function rellenar(plantilla, valores) {
  return String(plantilla).replace(/\{(\w+)\}/g, (_, k) => valores[k] ?? '');
}

const VACIO = {
  nombre: '', correo: '', proyecto: '', proyectoOtro: '',
  metodo: '', metodoOtro: '', pais: '', ciudad: '', telefono: '', nota: ''
};

const LIMITE_NOTA = 1500;

/* =============================================================
   Turnstile

   Se carga el script solo si hay clave de sitio configurada, y una sola
   vez aunque el componente se vuelva a montar. Sin clave, el formulario
   sigue funcionando con el honeypot como única defensa: es peor, pero
   preferible a bloquear el envío mientras Andrea configura Cloudflare.
   ============================================================= */
const scriptsCargados = new Map();

/* Carga un script externo una sola vez, aunque se pida varias veces. */
function cargarScript(src) {
  if (scriptsCargados.has(src)) return scriptsCargados.get(src);
  const promesa = new Promise((resolver, rechazar) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = () => resolver();
    s.onerror = () => rechazar(new Error(`no se pudo cargar ${src}`));
    document.head.appendChild(s);
  });
  scriptsCargados.set(src, promesa);
  return promesa;
}

function cargarTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  return cargarScript('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit')
    .then(() => window.turnstile);
}

function useTurnstile(activo, tema) {
  const contenedor = useRef(null);
  const widget = useRef(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!activo || !TURNSTILE_SITE_KEY || !contenedor.current) return;
    let vivo = true;

    cargarTurnstile()
      .then((ts) => {
        if (!vivo || !contenedor.current || widget.current !== null) return;
        widget.current = ts.render(contenedor.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: tema === 'light' ? 'light' : 'dark',
          callback: (t) => setToken(t),
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken('')
        });
      })
      .catch(() => setToken(''));

    return () => {
      vivo = false;
      if (widget.current !== null && window.turnstile) {
        window.turnstile.remove(widget.current);
        widget.current = null;
      }
    };
  }, [activo, tema]);

  const reiniciar = useCallback(() => {
    setToken('');
    if (widget.current !== null && window.turnstile) window.turnstile.reset(widget.current);
  }, []);

  return { contenedor, token, reiniciar };
}

/* =============================================================
   Campo con etiqueta y error

   Un solo sitio donde se decide cómo se enlaza el error con el control
   (aria-describedby) y cómo se marca inválido (aria-invalid). Repetir
   eso en cada campo es donde se cuelan los fallos de accesibilidad.
   ============================================================= */
function Campo({ id, etiqueta, pista, error, obligatorio, textoOpcional, prefijo, children, extra }) {
  const idPista = pista ? `${id}-pista` : undefined;
  const idError = error ? `${id}-error` : undefined;
  const descrito = [idError, idPista].filter(Boolean).join(' ') || undefined;

  // El id va SIEMPRE al control, nunca a un envoltorio: si lo recibe un div,
  // el <label for> apunta a un div y el campo se queda sin nombre accesible.
  const control = React.cloneElement(children, {
    id,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': descrito,
    'aria-required': obligatorio ? 'true' : undefined
  });

  return (
    <div className={`co-campo${error ? ' tiene-error' : ''}`}>
      <label htmlFor={id} className="co-etiqueta">
        {etiqueta}
        {!obligatorio && <span className="co-opcional"> ({textoOpcional})</span>}
      </label>
      {pista && <span id={idPista} className="co-pista">{pista}</span>}
      {prefijo ? (
        <div className="co-tel">
          <span className="co-prefijo" aria-hidden="true">{prefijo}</span>
          {control}
        </div>
      ) : control}
      {extra}
      {/* role=alert hace que el lector de pantalla lo lea en cuanto aparece */}
      {error && <span id={idError} className="co-error" role="alert">{error}</span>}
    </div>
  );
}

/* =============================================================
   Agenda (Cal.com)

   El script de Cal pesa bastante, así que no se carga con la página:
   solo cuando la persona pide ver los horarios. Así la sección no
   penaliza el tiempo de carga de todo el sitio.
   ============================================================= */
function Agenda({ t, tema }) {
  const [abierto, setAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [fallo, setFallo] = useState(false);
  const destino = useRef(null);

  useEffect(() => {
    if (!abierto || !CAL_LINK || !destino.current) return;
    setCargando(true);
    let vivo = true;

    // Con etiqueta de script y no con import(): un import() a una URL
    // externa lo intenta resolver el empaquetador en tiempo de compilación
    // y falla. Cal expone su API en window.Cal al cargar.
    cargarScript('https://app.cal.com/embed/embed.js')
      .then(() => {
        if (!vivo || !window.Cal || !destino.current) return;
        window.Cal('init', { origin: 'https://cal.com' });
        window.Cal('inline', {
          elementOrSelector: destino.current,
          calLink: CAL_LINK,
          config: { theme: tema === 'light' ? 'light' : 'dark' }
        });
        setCargando(false);
      })
      .catch(() => { if (vivo) { setCargando(false); setFallo(true); } });

    return () => { vivo = false; };
  }, [abierto, tema]);

  if (!CAL_LINK) return null;

  return (
    <div className="co-agenda">
      <h3 className="co-agenda-titulo">{t.contacto.agendaTitulo}</h3>
      <p className="co-agenda-sub">{t.contacto.agendaSub}</p>
      {!abierto ? (
        <button type="button" className="co-btn-secundario" onClick={() => setAbierto(true)}>
          {t.contacto.agendaCargar}
        </button>
      ) : (
        <>
          {cargando && <p className="co-agenda-cargando">{t.contacto.agendaCargando}…</p>}
          {fallo && <p className="co-agenda-cargando">{t.contacto.agendaAlterna}</p>}
          <div ref={destino} className="co-agenda-marco" />
        </>
      )}
    </div>
  );
}

/* =============================================================
   Sección de contacto
   ============================================================= */
export default function Contacto({ t, idioma, tema }) {
  const [datos, setDatos] = useState(VACIO);
  const [tocados, setTocados] = useState({});
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(null);
  const [falloEnvio, setFalloEnvio] = useState(null);
  const [intentado, setIntentado] = useState(false);

  const formRef = useRef(null);
  const trampa = useRef(null);          // honeypot
  const abortRef = useRef(null);
  const idBase = useId();

  const { contenedor: refTurnstile, token, reiniciar: reiniciarTurnstile } =
    useTurnstile(true, tema);

  const paises = useMemo(() => listaPaises(idioma), [idioma]);
  const ciudades = useMemo(() => ciudadesDe(datos.pais), [datos.pais]);
  const prefijo = datos.pais ? prefijoDe(datos.pais) : '';

  useEffect(() => () => abortRef.current?.abort(), []);

  const textoError = (campo) => {
    const clave = errores[campo];
    // El error solo se enseña cuando el campo ya se tocó o se intentó enviar:
    // ir gritando errores mientras la persona escribe el nombre es hostil.
    if (!clave || (!tocados[campo] && !intentado)) return null;
    return t.contacto.errores[clave] || clave;
  };

  const cambiar = (campo) => (e) => {
    const valor = e.target.type === 'radio' ? e.target.value : e.target.value;
    setDatos((prev) => {
      const siguiente = { ...prev, [campo]: valor };
      // Revalida en caliente solo si ya se había tocado, para que el error
      // desaparezca en cuanto se corrige.
      if (tocados[campo] || intentado) {
        setErrores((errs) => ({ ...errs, [campo]: validarCampo(campo, valor, siguiente) }));
      }
      return siguiente;
    });
  };

  const salir = (campo) => () => {
    setTocados((prev) => ({ ...prev, [campo]: true }));
    setErrores((errs) => ({ ...errs, [campo]: validarCampo(campo, datos[campo], datos) }));
  };

  const enviar = async (e) => {
    e.preventDefault();
    setIntentado(true);
    setFalloEnvio(null);

    // Honeypot: un campo escondido que una persona nunca rellena. Si trae
    // algo, es un bot. Se finge que salió bien para no darle información.
    if (trampa.current?.value) {
      setEnviado({ nombre: datos.nombre, correo: datos.correo });
      return;
    }

    const fallos = validarTodo(datos);
    setErrores(fallos);
    if (Object.keys(fallos).length > 0) {
      const primero = Object.keys(fallos)[0];
      formRef.current?.querySelector(`[name="${primero}"]`)?.focus();
      return;
    }

    setEnviando(true);
    abortRef.current = new AbortController();

    try {
      await enviarLead(
        {
          ...datos,
          telefono: datos.telefono ? `+${prefijo} ${datos.telefono}`.trim() : '',
          idioma,
          turnstileToken: token,
          origen: window.location.href
        },
        { signal: abortRef.current.signal }
      );
      setEnviado({ nombre: datos.nombre, correo: datos.correo });
      setDatos(VACIO);
      setTocados({});
      setIntentado(false);
    } catch (err) {
      if (err.name === 'AbortError') return;
      const clave = err instanceof ErrorDeEnvio ? err.clave : 'servidor';
      setFalloEnvio(clave);
      reiniciarTurnstile();
      if (err.detalle) console.error('[contacto]', clave, err.detalle);
    } finally {
      setEnviando(false);
    }
  };

  const idDe = (campo) => `${idBase}-${campo}`;
  const hayErroresVisibles = intentado && Object.values(errores).some(Boolean);

  if (enviado) {
    return (
      <section className="cta-final" id="cta">
        <div className="container">
          <div className="co-exito" role="status">
            <span className="co-exito-marca" aria-hidden="true">✓</span>
            <h2>{rellenar(t.contacto.exitoTitulo, enviado)}</h2>
            <p>{rellenar(t.contacto.exitoTexto, enviado)}</p>
            <button type="button" className="co-btn-secundario" onClick={() => setEnviado(null)}>
              {t.contacto.exitoOtro}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cta-final" id="cta">
      <div className="container">
        <h2 className="reveal">
          {t.cta.title} <em>{t.cta.titleEm}</em>
        </h2>
        <p className="co-intro reveal reveal-delay-1">{t.cta.sub}</p>

        <form className="co-form reveal reveal-delay-2" ref={formRef} onSubmit={enviar} noValidate>
          {/* Honeypot: fuera de la vista y fuera del recorrido de teclado y
              de los lectores de pantalla, para que solo lo rellenen bots. */}
          <div className="co-trampa" aria-hidden="true">
            <label htmlFor={idDe('web')}>No rellenar</label>
            <input id={idDe('web')} name="website" type="text" ref={trampa}
                   tabIndex={-1} autoComplete="off" />
          </div>

          <fieldset className="co-grupo">
            <legend className="co-leyenda">{t.contacto.leyendaDatos}</legend>
            <div className="co-rejilla">
              <Campo id={idDe('nombre')} etiqueta={t.contacto.nombre} pista={t.contacto.nombrePista}
                     error={textoError('nombre')} obligatorio textoOpcional={t.contacto.opcional}>
                <input name="nombre" type="text" autoComplete="name" maxLength={80}
                       value={datos.nombre} onChange={cambiar('nombre')} onBlur={salir('nombre')} />
              </Campo>

              <Campo id={idDe('correo')} etiqueta={t.contacto.correo}
                     error={textoError('correo')} obligatorio textoOpcional={t.contacto.opcional}>
                <input name="correo" type="email" autoComplete="email" inputMode="email" maxLength={120}
                       value={datos.correo} onChange={cambiar('correo')} onBlur={salir('correo')} />
              </Campo>

              <Campo id={idDe('pais')} etiqueta={t.contacto.pais}
                     error={textoError('pais')} obligatorio textoOpcional={t.contacto.opcional}>
                <select name="pais" autoComplete="country"
                        value={datos.pais} onChange={cambiar('pais')} onBlur={salir('pais')}>
                  <option value="">{t.contacto.paisElige}</option>
                  <optgroup label={t.contacto.paisFrecuentes}>
                    {paises.frecuentes.map((p) => (
                      <option key={p.iso} value={p.iso}>{p.nombre}</option>
                    ))}
                  </optgroup>
                  <optgroup label={t.contacto.paisTodos}>
                    {paises.resto.map((p) => (
                      <option key={p.iso} value={p.iso}>{p.nombre}</option>
                    ))}
                  </optgroup>
                </select>
              </Campo>

              <Campo id={idDe('ciudad')} etiqueta={t.contacto.ciudad}
                     pista={ciudades.length ? t.contacto.ciudadPista : undefined}
                     error={textoError('ciudad')} obligatorio textoOpcional={t.contacto.opcional}>
                <input name="ciudad" type="text" autoComplete="address-level2" maxLength={80}
                       list={ciudades.length ? idDe('ciudades') : undefined}
                       value={datos.ciudad} onChange={cambiar('ciudad')} onBlur={salir('ciudad')} />
              </Campo>
              {/* datalist sugiere sin obligar: se puede escribir cualquier ciudad */}
              {ciudades.length > 0 && (
                <datalist id={idDe('ciudades')}>
                  {ciudades.map((c) => <option key={c} value={c} />)}
                </datalist>
              )}

              <Campo id={idDe('telefono')} etiqueta={t.contacto.telefono}
                     pista={t.contacto.telefonoPista} error={textoError('telefono')}
                     textoOpcional={t.contacto.opcional}
                     prefijo={prefijo ? `+${prefijo}` : '+'}>
                <input name="telefono" type="tel" autoComplete="tel-national" inputMode="tel"
                       maxLength={20} value={datos.telefono}
                       onChange={cambiar('telefono')} onBlur={salir('telefono')} />
              </Campo>
            </div>
          </fieldset>

          <fieldset className="co-grupo">
            <legend className="co-leyenda">{t.contacto.leyendaProyecto}</legend>
            <div className="co-rejilla">
              <Campo id={idDe('proyecto')} etiqueta={t.contacto.proyecto}
                     error={textoError('proyecto')} obligatorio textoOpcional={t.contacto.opcional}>
                <select name="proyecto" value={datos.proyecto}
                        onChange={cambiar('proyecto')} onBlur={salir('proyecto')}>
                  <option value="">{t.contacto.proyectoElige}</option>
                  {PROYECTOS.map((clave) => (
                    <option key={clave} value={clave}>{t.contacto.proyectoOpciones[clave]}</option>
                  ))}
                </select>
              </Campo>

              {datos.proyecto === 'otro' && (
                <Campo id={idDe('proyectoOtro')} etiqueta={t.contacto.proyectoOtro}
                       pista={t.contacto.proyectoOtroPista} error={textoError('proyectoOtro')}
                       obligatorio textoOpcional={t.contacto.opcional}>
                  <input name="proyectoOtro" type="text" maxLength={120} value={datos.proyectoOtro}
                         onChange={cambiar('proyectoOtro')} onBlur={salir('proyectoOtro')} />
                </Campo>
              )}
            </div>

            <div className="co-campo co-ancho">
              <label htmlFor={idDe('nota')} className="co-etiqueta">
                {t.contacto.nota}
                <span className="co-opcional"> ({t.contacto.opcional})</span>
              </label>
              <span id={`${idDe('nota')}-pista`} className="co-pista">{t.contacto.notaPista}</span>
              <textarea id={idDe('nota')} name="nota" rows={4} maxLength={LIMITE_NOTA}
                        aria-describedby={`${idDe('nota')}-pista ${idDe('nota')}-cuenta`}
                        value={datos.nota} onChange={cambiar('nota')} onBlur={salir('nota')} />
              <span id={`${idDe('nota')}-cuenta`} className="co-cuenta">
                {LIMITE_NOTA - datos.nota.length} {t.contacto.restantes}
              </span>
            </div>
          </fieldset>

          <fieldset className="co-grupo">
            <legend className="co-leyenda">{t.contacto.leyendaContacto}</legend>

            {/* Los radios van en su propio fieldset con legend: es lo que
                agrupa las opciones para un lector de pantalla. */}
            {/* role=radiogroup + aria-required: en un fieldset suelto el
                aria-required no lo anuncian los lectores de pantalla. */}
            <fieldset className={`co-radios${textoError('metodo') ? ' tiene-error' : ''}`}
                      role="radiogroup" aria-required="true"
                      aria-labelledby={`${idDe('metodo')}-leyenda`}
                      aria-invalid={textoError('metodo') ? 'true' : undefined}>
              <legend id={`${idDe('metodo')}-leyenda`} className="co-etiqueta">{t.contacto.metodo}</legend>
              <div className="co-radios-fila">
                {METODOS_CONTACTO.map((clave) => (
                  <label key={clave} className="co-radio">
                    <input type="radio" name="metodo" value={clave}
                           checked={datos.metodo === clave}
                           aria-describedby={textoError('metodo') ? `${idDe('metodo')}-error` : undefined}
                           onChange={cambiar('metodo')} onBlur={salir('metodo')} />
                    <span>{t.contacto.metodoOpciones[clave]}</span>
                  </label>
                ))}
              </div>
              {textoError('metodo') && (
                <span id={`${idDe('metodo')}-error`} className="co-error" role="alert">
                  {textoError('metodo')}
                </span>
              )}
            </fieldset>

            {datos.metodo === 'otro' && (
              <div className="co-rejilla">
                <Campo id={idDe('metodoOtro')} etiqueta={t.contacto.metodoOtro}
                       error={textoError('metodoOtro')} obligatorio
                       textoOpcional={t.contacto.opcional}>
                  <input name="metodoOtro" type="text" maxLength={80} value={datos.metodoOtro}
                         onChange={cambiar('metodoOtro')} onBlur={salir('metodoOtro')} />
                </Campo>
              </div>
            )}
          </fieldset>

          {TURNSTILE_SITE_KEY && <div className="co-turnstile" ref={refTurnstile} />}

          {/* aria-live para que el fallo se anuncie sin mover el foco */}
          <div aria-live="polite" className="co-avisos">
            {hayErroresVisibles && !falloEnvio && (
              <p className="co-aviso-error">{t.contacto.revisaCampos}</p>
            )}
            {falloEnvio && (
              <div className="co-fallo" role="alert">
                <strong>{t.contacto.fallos.titulo}</strong>
                <span>{rellenar(t.contacto.fallos[falloEnvio] || t.contacto.fallos.servidor,
                                { correo: t.footer.email })}</span>
              </div>
            )}
          </div>

          <button type="submit" className="co-enviar" disabled={enviando}>
            {enviando ? (
              <>
                <span className="co-girador" aria-hidden="true" />
                {t.contacto.enviando}…
              </>
            ) : (
              <>
                {t.contacto.enviar}
                <span className="arrow">→</span>
              </>
            )}
          </button>

          {!estaConfigurado() && (
            <p className="co-nota-config">
              {rellenar(t.contacto.fallos.sinConfigurar, { correo: t.footer.email })}
            </p>
          )}
        </form>

        <Agenda t={t} tema={tema} />

        <div className="cta-secondary reveal reveal-delay-3">{t.cta.sec}</div>
      </div>
    </section>
  );
}
