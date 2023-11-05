import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    host: true,
    port: 8080,
  },
  plugins: [
    checker({
      typescript: true,
    }),
  ],
});
