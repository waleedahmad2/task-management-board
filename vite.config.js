import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: 'sentry-boilerplate',
      project: 'javascript-react',
    }),
  ],

  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@common': path.resolve(__dirname, './src/common'),
      '@useContext': path.resolve(__dirname, './src/context'),
      '@constants': path.resolve(__dirname, './src/constants'),
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
