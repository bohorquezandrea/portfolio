# Cómo poner el portfolio en línea

El proyecto ya está listo: tiene commit, workflow de despliegue y la ruta
base configurada. Faltan los pasos que solo puedes hacer tú, porque
requieren tu contraseña de GitHub.

---

## Abrirlo en tu computador (esto es lo primero)

```bash
cd ~/Dev/andrea-portfolio
npm run dev
```

Se abre solo en el navegador. Si no, entra a **http://localhost:5173**.

Para cerrarlo: `Ctrl + C` en esa terminal.

Si algún día da error de dependencias, `npm install` y vuelve a intentar.

---

## Publicarlo (una sola vez)

### Aviso importante antes de empezar

Tu repo `portfolio` en GitHub tiene el **sitio viejo de mayo**, y esta
carpeta nunca fue un repo git, así que no comparten historial. Si empujas
directo, GitHub lo rechaza; y si fuerzas sin más, pierdes el sitio viejo.

Los comandos de abajo **guardan el sitio viejo en una rama** llamada
`v1-mayo2026` antes de publicar el nuevo. Así no pierdes nada.

### Paso 1: conectar con tu repo

```bash
cd ~/Dev/andrea-portfolio
git remote add origin https://github.com/bohorquezandrea/portfolio.git
git fetch origin
```

### Paso 2: guardar el sitio viejo en una rama

```bash
git branch v1-mayo2026 origin/main
git push origin v1-mayo2026
```

Si te dice que `origin/main` no existe, prueba con `origin/master`. Si
tampoco, el repo está vacío y puedes saltarte este paso.

### Paso 3: publicar el nuevo

```bash
git push -f origin main
```

Te va a pedir usuario y contraseña. **GitHub ya no acepta la contraseña
normal**: necesitas un token. Si no tienes uno:

1. Entra a github.com → tu foto arriba a la derecha → Settings
2. Baja del todo → Developer settings → Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Marca la casilla **repo** y también **workflow**
5. Copia el token y úsalo como contraseña (el usuario es `bohorquezandrea`)

Guarda ese token en algún lugar seguro, no se vuelve a mostrar.

### Paso 4: activar GitHub Pages

1. Entra a `https://github.com/bohorquezandrea/portfolio`
2. Pestaña **Settings**
3. Menú lateral → **Pages**
4. En **Source**, elige **GitHub Actions** (no "Deploy from a branch")

Listo. Ve a la pestaña **Actions** del repo y vas a ver el despliegue
corriendo. Tarda 1 o 2 minutos.

### Resultado

**https://bohorquezandrea.github.io/portfolio/**

---

## A partir de ahora

Cada vez que quieras publicar un cambio:

```bash
cd ~/Dev/andrea-portfolio
git add -A
git commit -m "lo que cambiaste"
git push
```

GitHub compila y publica solo. No tienes que subir la carpeta `dist`.

---

## Si prefieres que el portfolio quede en la raíz

Ahora mismo queda en `bohorquezandrea.github.io/portfolio/`. Si lo quieres
en `bohorquezandrea.github.io` a secas, tienes que publicarlo en un repo
llamado exactamente `bohorquezandrea.github.io`, y cambiar una línea:

En `vite.config.js`, esta línea:

```js
const base = process.env.BASE ?? '/portfolio/';
```

pasa a:

```js
const base = process.env.BASE ?? '/';
```

---

## Los proyectos que quieres que sean interactivos

Pokémon Fetch y Simon Game son HTML y JavaScript puro, así que GitHub los
puede servir directamente y quedan jugables desde el navegador. Para cada
uno:

1. Entra al repo en github.com
2. **Settings** → **Pages**
3. En **Source** elige **Deploy from a branch**
4. Branch: `main`, carpeta: `/ (root)` → Save

Queda en `https://bohorquezandrea.github.io/NOMBRE-DEL-REPO/`

**Requisito:** el archivo principal tiene que llamarse `index.html` y estar
en la raíz del repo. Si se llama distinto o está en una subcarpeta, no
carga. Dime cómo están organizados y te digo qué mover.

Artist Finder es Python, así que GitHub Pages **no** puede ejecutarlo
(Pages solo sirve archivos estáticos, no corre servidores). Para ese
necesitas un servicio como Render o Railway, que tienen plan gratuito.
Si quieres lo montamos.
