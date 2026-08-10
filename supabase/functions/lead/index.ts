/* =============================================================
   Edge Function: recepción de leads del formulario de contacto

   Corre en Deno, dentro de Supabase. Es el único sitio del sistema donde
   viven secretos, y hace las tres cosas que un sitio estático no puede:

   1. Comprobar el token de Turnstile contra Cloudflare. Esto TIENE que
      pasar aquí: si se validara en el navegador, cualquiera se lo salta
      llamando a la base directamente.
   2. Escribir en la base con la clave de servicio, sin exponerla.
   3. Mandar el correo de aviso a Andrea.

   La validación de los campos se repite aquí aunque el formulario ya la
   haga. La del navegador es comodidad para quien rellena; la de verdad
   es esta, porque a este endpoint se le puede llamar con curl.
   ============================================================= */

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const TURNSTILE_SECRET = Deno.env.get('TURNSTILE_SECRET_KEY') ?? '';
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const CORREO_AVISO = Deno.env.get('CORREO_AVISO') ?? '';
const REMITENTE = Deno.env.get('REMITENTE') ?? 'Formulario <onboarding@resend.dev>';

/* Solo se aceptan envíos desde estos orígenes. Sin esto el formulario de
   cualquiera podría apuntar a esta función. */
const ORIGENES = [
  'https://andreabohorquez.co',
  'https://www.andreabohorquez.co',
  'https://andreabohorquez.com',
  'https://www.andreabohorquez.com',
  'https://bohorquezandrea.github.io',
  'http://localhost:5173',
  'http://localhost:4173'
];

const PROYECTOS = [
  'automatizacion-ventas', 'inscripciones-formularios', 'landing-web',
  'automatizacion-claude-code', 'chatbot-quiz', 'otro'
];
const METODOS = ['correo', 'whatsapp', 'otro'];
const CORREO_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function cabeceras(origen: string | null) {
  const permitido = origen && ORIGENES.includes(origen) ? origen : ORIGENES[0];
  return {
    'Access-Control-Allow-Origin': permitido,
    'Access-Control-Allow-Headers': 'authorization, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
}

function texto(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function validar(d: Record<string, unknown>): string | null {
  const nombre = texto(d.nombre, 80);
  const correo = texto(d.correo, 120);

  if (nombre.length < 2) return 'nombre';
  if (!CORREO_RE.test(correo)) return 'correo';
  if (!PROYECTOS.includes(texto(d.proyecto, 40))) return 'proyecto';
  if (d.proyecto === 'otro' && !texto(d.proyectoOtro, 120)) return 'proyectoOtro';
  if (!METODOS.includes(texto(d.metodo, 20))) return 'metodo';
  if (d.metodo === 'otro' && !texto(d.metodoOtro, 80)) return 'metodoOtro';
  if (!texto(d.pais, 2)) return 'pais';
  if (!texto(d.ciudad, 80)) return 'ciudad';
  return null;
}

async function verificarTurnstile(token: string, ip: string): Promise<boolean> {
  // Sin secreto configurado no se puede verificar. Se deja pasar a
  // propósito para que el formulario funcione mientras Cloudflare no
  // esté puesto: el honeypot sigue filtrando lo más burdo.
  if (!TURNSTILE_SECRET) return true;
  if (!token) return false;

  const cuerpo = new FormData();
  cuerpo.append('secret', TURNSTILE_SECRET);
  cuerpo.append('response', token);
  if (ip) cuerpo.append('remoteip', ip);

  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: cuerpo
    });
    const j = await r.json();
    return j.success === true;
  } catch {
    return false;
  }
}

/* Límite por IP: cinco envíos por hora. Se cuenta contra la propia tabla
   en vez de montar un Redis, que para este volumen sobra. */
async function demasiados(ip: string): Promise<boolean> {
  if (!ip) return false;
  const desde = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const url = `${SUPABASE_URL}/rest/v1/leads?select=id&ip=eq.${encodeURIComponent(ip)}&creado_en=gte.${desde}`;
  try {
    const r = await fetch(url, {
      headers: {
        apikey: SERVICE_ROLE,
        Authorization: `Bearer ${SERVICE_ROLE}`,
        Prefer: 'count=exact'
      }
    });
    const rango = r.headers.get('content-range') ?? '';
    const total = Number(rango.split('/')[1] ?? 0);
    return total >= 5;
  } catch {
    return false;   // si el conteo falla, no se bloquea a nadie
  }
}

async function avisarPorCorreo(lead: Record<string, string>) {
  if (!RESEND_API_KEY || !CORREO_AVISO) return;

  const fila = (k: string, v: string) =>
    v ? `<tr><td style="padding:6px 14px 6px 0;color:#6b7280">${k}</td><td style="padding:6px 0"><strong>${v}</strong></td></tr>` : '';

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="margin:0 0 4px">Nuevo lead: ${lead.nombre}</h2>
      <p style="margin:0 0 18px;color:#6b7280">${lead.proyecto_etiqueta}</p>
      <table style="border-collapse:collapse;font-size:14px">
        ${fila('Correo', lead.correo)}
        ${fila('Teléfono', lead.telefono)}
        ${fila('Prefiere', lead.metodo)}
        ${fila('Dónde', `${lead.ciudad}, ${lead.pais}`)}
        ${fila('Idioma', lead.idioma)}
      </table>
      ${lead.nota ? `<p style="margin:18px 0 0;padding:14px;background:#f3f4f6;border-radius:8px;white-space:pre-wrap">${lead.nota}</p>` : ''}
    </div>`;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: REMITENTE,
        to: [CORREO_AVISO],
        reply_to: lead.correo,   // responder desde el correo va directo al cliente
        subject: `Nuevo lead: ${lead.nombre} · ${lead.proyecto_etiqueta}`,
        html
      })
    });
  } catch (e) {
    // El correo es un aviso, no el registro. Si Resend falla, el lead ya
    // está guardado en la base y no se pierde: no se rompe la respuesta.
    console.error('resend', e instanceof Error ? e.message : e);
  }
}

Deno.serve(async (req) => {
  const origen = req.headers.get('origin');

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cabeceras(origen) });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'método no permitido' }), {
      status: 405, headers: cabeceras(origen)
    });
  }
  if (origen && !ORIGENES.includes(origen)) {
    return new Response(JSON.stringify({ error: 'origen no permitido' }), {
      status: 403, headers: cabeceras(origen)
    });
  }

  let d: Record<string, unknown>;
  try {
    d = await req.json();
  } catch {
    return new Response(JSON.stringify({ codigo: 'validacion', error: 'cuerpo ilegible' }), {
      status: 400, headers: cabeceras(origen)
    });
  }

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim();

  const campoMalo = validar(d);
  if (campoMalo) {
    return new Response(JSON.stringify({ codigo: 'validacion', error: `campo inválido: ${campoMalo}` }), {
      status: 400, headers: cabeceras(origen)
    });
  }

  if (!(await verificarTurnstile(texto(d.turnstileToken, 4000), ip))) {
    return new Response(JSON.stringify({ codigo: 'antispam', error: 'verificación fallida' }), {
      status: 403, headers: cabeceras(origen)
    });
  }

  if (await demasiados(ip)) {
    return new Response(JSON.stringify({ error: 'demasiados envíos' }), {
      status: 429, headers: cabeceras(origen)
    });
  }

  const proyecto = texto(d.proyecto, 40);
  const metodo = texto(d.metodo, 20);

  const lead = {
    nombre: texto(d.nombre, 80),
    correo: texto(d.correo, 120),
    proyecto,
    proyecto_otro: proyecto === 'otro' ? texto(d.proyectoOtro, 120) : '',
    metodo,
    metodo_otro: metodo === 'otro' ? texto(d.metodoOtro, 80) : '',
    pais: texto(d.pais, 2),
    ciudad: texto(d.ciudad, 80),
    telefono: texto(d.telefono, 30),
    nota: texto(d.nota, 1500),
    idioma: texto(d.idioma, 5),
    origen_url: texto(d.origen, 300),
    ip
  };

  const guardar = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_ROLE,
      Authorization: `Bearer ${SERVICE_ROLE}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify(lead)
  });

  if (!guardar.ok) {
    const detalle = await guardar.text();
    console.error('insert', guardar.status, detalle);
    return new Response(JSON.stringify({ error: 'no se pudo guardar' }), {
      status: 500, headers: cabeceras(origen)
    });
  }

  await avisarPorCorreo({
    ...lead,
    proyecto_etiqueta: lead.proyecto_otro || lead.proyecto,
    metodo: lead.metodo_otro || lead.metodo
  } as Record<string, string>);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200, headers: cabeceras(origen)
  });
});
