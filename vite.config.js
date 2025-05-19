import path from 'path';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
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
