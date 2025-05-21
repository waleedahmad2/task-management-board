import path from 'node:path';

import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/app',
  plugins: [
    react(),
    tailwindcss(),
    sentryVitePlugin({
      org: 'sentry-boilerplate',
      project: 'javascript-react',
      sourcemaps: {
        assets: './dist/**',
        filesToDeleteAfterUpload: ['./dist/**/*.js.map'],
      },
    }),
  ],
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#env': path.resolve(__dirname, './env.mjs'),
    },
  },

  server: {
    host: true,
    port: 3000,
  },

  build: {
    sourcemap: true,
  },
});
