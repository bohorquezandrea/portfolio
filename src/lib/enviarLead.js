/* =============================================================
   Envío del formulario de contacto

   El portfolio es un sitio estático: no tiene servidor propio. El envío
   va a una Edge Function de Supabase, que es la que puede guardar cosas
   sin exponer credenciales.

   Reparto de responsabilidades:

   - El navegador solo manda el formulario. Las claves que lleva son
     públicas por diseño (la anónima de Supabase y la de sitio de
     Turnstile); están pensadas para verse en el código del cliente.
   - La Edge Function hace lo que no puede hacerse aquí: comprobar el
     token antispam contra Cloudflare, escribir en la base con la clave
     de servicio y mandar el correo de aviso.

   Por eso no se escribe en Supabase desde el navegador aunque se pueda:
   si la validación antispam la hicieras aquí, cualquiera se la salta
   llamando a la base directamente.
   ============================================================= */

const URL_SUPABASE = import.meta.env.VITE_SUPABASE_URL;
const CLAVE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

/* Permite que el formulario avise con claridad en vez de fallar de forma
   rara cuando todavía no se han configurado las variables de entorno. */
export function estaConfigurado() {
  return Boolean(URL_SUPABASE && CLAVE_ANON);
}

export class ErrorDeEnvio extends Error {
  constructor(clave, detalle) {
    super(clave);
    this.clave = clave;       // el formulario la traduce al idioma activo
    this.detalle = detalle;   // para la consola, no se le enseña al usuario
  }
}

export async function enviarLead(datos, { signal } = {}) {
  if (!estaConfigurado()) {
    throw new ErrorDeEnvio('sinConfigurar', 'faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY');
  }

  let respuesta;
  try {
    respuesta = await fetch(`${URL_SUPABASE}/functions/v1/lead`, {
      method: 'POST',
      signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CLAVE_ANON}`
      },
      body: JSON.stringify(datos)
    });
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    // Aquí caen los fallos de red: sin conexión, DNS, CORS, servidor caído
    throw new ErrorDeEnvio('red', e.message);
  }

  if (respuesta.status === 429) {
    throw new ErrorDeEnvio('demasiados', 'limite de envios alcanzado');
  }

  if (!respuesta.ok) {
    let detalle = `HTTP ${respuesta.status}`;
    try {
      const cuerpo = await respuesta.json();
      if (cuerpo?.error) detalle = cuerpo.error;
      // La función distingue el fallo del antispam para poder pedir
      // que se repita la verificación en vez de dar un error genérico.
      if (cuerpo?.codigo === 'antispam') throw new ErrorDeEnvio('antispam', detalle);
      if (cuerpo?.codigo === 'validacion') throw new ErrorDeEnvio('validacion', detalle);
    } catch (e) {
      if (e instanceof ErrorDeEnvio) throw e;
    }
    throw new ErrorDeEnvio('servidor', detalle);
  }

  return respuesta.json();
}
