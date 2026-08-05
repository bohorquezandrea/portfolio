import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  // El sitio se publica en un dominio propio (andreabohorquez.co), asi que
  // vive en la RAIZ y la base es '/'. Si alguna vez se sirviera desde
  // bohorquezandrea.github.io/portfolio/ habria que compilar con
  // BASE=/portfolio/ npm run build, porque ahi los assets no cuelgan de la
  // raiz del dominio.
  base: process.env.BASE ?? '/',

  plugins: [react()],

  server: {
    // Respeta el puerto que asigne el entorno; 5173 solo como preferencia.
    // Sin esto, dos servidores del mismo proyecto chocan en el mismo puerto.
    port: Number(process.env.PORT) || 5173,
    open: false
  },

  build: { target: 'es2020', sourcemap: false }
}));
