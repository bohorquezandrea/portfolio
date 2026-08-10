# Formulario de contacto: cómo conectarlo

El formulario ya está construido y funcionando. Lo que falta son cuatro
cuentas que solo puedes crear tú, porque piden tu correo y tu contraseña.

Sin configurar nada, el formulario **se ve y valida bien**, pero al enviar
avisa de que todavía no está conectado y ofrece tu correo directo. Nadie se
queda sin poder escribirte.

Las cuatro son gratis en el volumen que vas a tener.

---

## Por qué hace falta todo esto

Tu portfolio es un sitio estático: son archivos que GitHub sirve tal cual,
sin ningún programa detrás. Eso lo hace rápido y barato, pero significa que
no hay nadie del lado del servidor que pueda guardar un lead ni mandarte un
correo.

Supabase pone ese "alguien": una función pequeña que sí corre en un
servidor. Es la única pieza que guarda secretos.

```
Navegador                  Edge Function              Servicios
(público)                  (privado)
formulario  ──envía──>  verifica antispam  ──>  Cloudflare Turnstile
                        guarda el lead     ──>  base de datos Supabase
                        te avisa           ──>  Resend (correo)
```

Todo lo que va en `.env.local` es público a propósito: acaba dentro del
JavaScript que descarga cualquiera. Los secretos de verdad se configuran
dentro de Supabase, donde nadie los ve.

---

## Paso 1: Supabase (base de datos)

1. Entra a **https://supabase.com** y crea una cuenta
2. **New project**. Ponle nombre `portfolio-leads`, elige región
   **East US** (la más cercana a Colombia con plan gratis) y guarda la
   contraseña que te genera
3. Cuando termine de crearse, ve a **SQL Editor** → **New query**
4. Pega entero el contenido de `supabase/migraciones/001_leads.sql` y dale
   a **Run**

   Eso crea la tabla y la deja cerrada: nadie puede leer tus leads desde
   fuera aunque tenga la clave pública.

5. Ve a **Project Settings** → **API** y copia dos valores:
   - **Project URL** → va en `VITE_SUPABASE_URL`
   - **anon public** → va en `VITE_SUPABASE_ANON_KEY`

   La tercera clave que verás ahí, **service_role**, es la peligrosa. Esa
   no se copia a ningún archivo del proyecto. Se usa sola dentro de la
   función.

---

## Paso 2: Resend (el correo de aviso)

1. Entra a **https://resend.com** y crea la cuenta
2. **API Keys** → **Create API Key**, permiso *Sending access*
3. Copia la clave. La vas a pegar en el paso 4, no en `.env.local`

Con la cuenta recién creada puedes enviar desde `onboarding@resend.dev` sin
verificar nada. Si más adelante quieres que los avisos lleguen desde
`hola@andreabohorquez.co`, hay que verificar el dominio en Resend
añadiendo unos registros DNS en GoDaddy.

---

## Paso 3: Cloudflare Turnstile (antispam)

1. Entra a **https://dash.cloudflare.com** → **Turnstile** → **Add site**
2. Nombre: `andreabohorquez`. Dominios: `andreabohorquez.co` y `localhost`
3. Widget mode: **Managed**
4. Te da dos claves:
   - **Site Key** → va en `VITE_TURNSTILE_SITE_KEY`
   - **Secret Key** → va en el paso 4

Es la alternativa a los captchas de semáforos: en la mayoría de los casos
el visitante no tiene que hacer nada, solo se marca una casilla.

---

## Paso 4: desplegar la función

Instala la herramienta de Supabase y súbela:

```bash
brew install supabase/tap/supabase
```

```bash
cd ~/Dev/andrea-portfolio && supabase login
```

Enlaza el proyecto (el identificador sale en la URL del panel de Supabase,
`https://supabase.com/dashboard/project/AQUI-ESTA`):

```bash
supabase link --project-ref TU-IDENTIFICADOR
```

Carga los secretos. **Estos cuatro son los de verdad y nunca salen de
Supabase.** Pega cada valor directamente desde donde lo generaste, sin
pasarlo por ningún chat:

```bash
supabase secrets set TURNSTILE_SECRET_KEY=... RESEND_API_KEY=... CORREO_AVISO=andreabproyectos@gmail.com
```

Y despliega:

```bash
supabase functions deploy lead --no-verify-jwt
```

`--no-verify-jwt` va porque quien envía el formulario es un visitante
anónimo, no un usuario con sesión iniciada. La función se protege sola con
la comprobación de origen, el antispam y el límite por IP.

---

## Paso 5: Cal.com (la agenda)

1. Entra a **https://cal.com** y crea la cuenta
2. Conecta tu Google Calendar en **Apps** → **Google Calendar**. Eso es lo
   que hace que solo aparezcan tus huecos libres de verdad
3. Crea un evento de **45 minutos**
4. Copia el enlace, que tiene la forma `usuario/evento`, por ejemplo
   `andreabohorquez/45min` → va en `VITE_CAL_LINK`

Si dejas esta variable vacía, el bloque de agenda simplemente no aparece y
el formulario sigue funcionando.

---

## Paso 6: juntarlo todo

Crea tu archivo de variables a partir del ejemplo:

```bash
cp ~/Dev/andrea-portfolio/.env.example ~/Dev/andrea-portfolio/.env.local
```

Ábrelo y rellena los cuatro valores públicos:

```bash
open -e ~/Dev/andrea-portfolio/.env.local
```

`.env.local` está en `.gitignore`, así que nunca se sube. Ya lo comprobé.

Pruébalo en local:

```bash
npm run dev --prefix ~/Dev/andrea-portfolio
```

Rellena el formulario y envíalo. Debería llegarte el correo y aparecer la
fila en **Table Editor** → **leads** en Supabase.

---

## Paso 7: que funcione también en producción

GitHub Actions compila el sitio en sus servidores, y ahí no existe tu
`.env.local`. Hay que darle esos cuatro valores como *secrets* del repo:

1. **https://github.com/bohorquezandrea/portfolio/settings/secrets/actions**
2. **New repository secret**, uno por cada uno:
   `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`,
   `VITE_TURNSTILE_SITE_KEY`, `VITE_CAL_LINK`

El workflow ya está preparado para leerlos.

---

## Dónde ves los leads

**https://supabase.com/dashboard** → tu proyecto → **Table Editor** →
`leads`.

Cada fila trae una columna `estado` que puedes cambiar a mano según vayas
avanzando: `nuevo`, `contactado`, `agendado`, `cerrado`, `descartado`.

Además te llega un correo por cada uno. Si le das a responder, la respuesta
va directa al cliente, no a ti misma.

---

## Si algo falla

**El formulario dice que no está conectado.** Faltan `VITE_SUPABASE_URL` o
`VITE_SUPABASE_ANON_KEY`, o no reiniciaste `npm run dev` después de crear
el archivo. Vite solo lee las variables al arrancar.

**Envía pero no llega el correo.** El lead sí se guardó, mira la tabla. El
fallo está en Resend: revisa la clave con
`supabase functions logs lead`.

**Dice que la verificación antispam no pasó.** La *Site Key* y la *Secret
Key* son de sitios distintos, o el dominio no está en la lista de Turnstile.

**Error de CORS en la consola.** El origen desde el que envías no está en
la lista `ORIGENES` de `supabase/functions/lead/index.ts`. Añádelo y vuelve
a desplegar.
