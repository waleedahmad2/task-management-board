import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()] as any,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    css: true,
    include: ['src/test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test-setup.ts',
        'src/test/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/dist/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,playwright,babel,turbo,eslint,prettier}.config.*',
      ],
    },
    env: {
      VITE_BACKEND_BASE_URL: 'http://localhost:3000',
      VITE_ENV: 'development',
      VITE_SENTRY: '0',
      VITE_ENCRYPTED_KEY: 'test-key-for-testing',
    },
  },
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#env': path.resolve(__dirname, './env.mjs'),
    },
  },
});


