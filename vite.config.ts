import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { ViteAliases } from 'vite-aliases';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    ViteAliases({
      useConfig: true,
      useTypescript: true,
    }),
  ],
});
