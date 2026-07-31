import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// El sitio se publica en bohorquezandrea.github.io/portfolio/, asi que los
// assets NO cuelgan de la raiz del dominio. `base` reescribe las rutas del
// bundle. Si algun dia se publica en la raiz (repo bohorquezandrea.github.io),
// basta con poner BASE=/ al construir.
const base = process.env.BASE ?? '/portfolio/';

export default defineConfig({
  base,
  plugins: [react()],
  server: { port: 5173, open: true },
  build: { target: 'es2020', sourcemap: false }
});
