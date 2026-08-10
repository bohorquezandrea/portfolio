-- =============================================================
-- Tabla de leads del formulario de contacto
--
-- Se ejecuta una sola vez, desde el editor SQL de Supabase.
-- =============================================================

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  creado_en     timestamptz not null default now(),

  nombre        text not null,
  correo        text not null,

  proyecto      text not null,
  proyecto_otro text default '',

  metodo        text not null,
  metodo_otro   text default '',

  pais          text not null,      -- código ISO de dos letras
  ciudad        text not null,
  telefono      text default '',
  nota          text default '',

  idioma        text default 'es',
  origen_url    text default '',
  ip            text default '',    -- solo para el límite de envíos por hora

  -- Para el seguimiento comercial, se cambia a mano desde el panel
  estado        text not null default 'nuevo'
                check (estado in ('nuevo', 'contactado', 'agendado', 'cerrado', 'descartado'))
);

-- El listado del panel se ordena por fecha y se filtra por estado
create index if not exists leads_creado_en_idx on public.leads (creado_en desc);
create index if not exists leads_estado_idx    on public.leads (estado);

-- El conteo del límite por IP filtra por ip + fecha
create index if not exists leads_ip_fecha_idx  on public.leads (ip, creado_en desc);

-- =============================================================
-- Seguridad
--
-- RLS activado y SIN ninguna política: eso deja la tabla cerrada a
-- cal y canto para las claves anónima y autenticada. Quien escribe es
-- la Edge Function, que usa la clave de servicio y por diseño se salta
-- RLS.
--
-- O sea: nadie puede leer los leads desde el navegador aunque tenga la
-- clave anónima, que es pública. Andrea los ve desde el panel de
-- Supabase, que entra con su propia sesión.
-- =============================================================
alter table public.leads enable row level security;

comment on table public.leads is
  'Leads del formulario de contacto. Escribe solo la Edge Function "lead" con service_role.';
