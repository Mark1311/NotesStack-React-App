import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/', // Root path for deployment (ensure it's correct for your setup)
  plugins: [
    tailwindcss(),
  ],
});
