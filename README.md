# Andrea Bohorquez · Portfolio

Landing + portfolio personal. React + Vite, sin Tailwind ni librerías de UI. Paleta alto croma: verde botella, lavanda y durazno. Modo claro / oscuro adaptable. Ver BRAND.md.

## Cómo correrlo en local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Build de producción

```bash
npm run build
npm run preview
```

El output queda en `/dist`. Sube esa carpeta a tu hosting (BanaHosting → File Manager → public_html → reemplaza el contenido del WordPress actual).

## Estructura

```
src/
  App.jsx          ← componentes (Nav, Hero, Offers, Stack, Cases, FAQ…)
  i18n.js          ← copy en ES + EN (sin precios)
  styles.css       ← tokens de marca + dark mode + animaciones
  main.jsx         ← entrada Vite
  assets/
    logo-ab.svg    ← logo monograma vector (reemplazable por PNG real)
public/
  img/cases/       ← capturas de proyectos (ver README en esa carpeta)
BRAND.md           ← manual de marca (paleta + tipografías + tono)
```

## Imágenes requeridas

Mira `public/img/cases/README.md`. Cuando subas las capturas con los nombres exactos, el slideshow las carga automáticamente.

## Logo

El SVG actual es vectorial, se adapta al modo claro/oscuro. Si prefieres usar tu PNG con calidad de joyería:

1. Guarda tu PNG (letra negra, fondo transparente) como `src/assets/logo-ab.png`.
2. En `src/App.jsx` cambia la línea 3:
   `import logo from './assets/logo-ab.svg';` → `import logo from './assets/logo-ab.png';`

## Stack

- React 18 + Vite
- CSS puro con CSS variables y `color-mix()` para teming
- IntersectionObserver para reveals
- `localStorage + prefers-color-scheme` para modo oscuro
- Google Fonts: Inter, Cormorant Garamond, Italiana

## Idiomas

ES (default) / EN — toggle en la nav superior. Persistencia automática.

## Despliegue en WordPress (BanaHosting)

Tienes dos caminos:

1. **Reemplazar WordPress por estático** (recomendado): subir `/dist` a `public_html`, deshabilitar WordPress en ese dominio.
2. **Mantener WordPress** y servir esto desde una carpeta: subir `/dist` a `public_html/portfolio/` y apuntar el dominio raíz a esa subcarpeta vía `.htaccess`.

Te puedo guiar paso a paso cuando vayas a hacer el deploy.
