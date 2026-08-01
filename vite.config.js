import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  // En produccion el sitio cuelga de bohorquezandrea.github.io/portfolio/,
  // asi que los assets NO estan en la raiz del dominio y hay que reescribir
  // las rutas. En desarrollo se sirve desde la raiz: si aqui tambien se
  // aplicara la subruta, http://localhost:5173/ devolveria 404 y habria que
  // entrar a /portfolio/ a mano.
  // Para publicar en la raiz (repo bohorquezandrea.github.io):
  //   BASE=/ npm run build
  base: command === 'build' ? (process.env.BASE ?? '/portfolio/') : '/',

  plugins: [react()],

  server: {
    // Respeta el puerto que asigne el entorno; 5173 solo como preferencia.
    // Sin esto, dos servidores del mismo proyecto chocan en el mismo puerto.
    port: Number(process.env.PORT) || 5173,
    open: false
  },

  build: { target: 'es2020', sourcemap: false }
}));
