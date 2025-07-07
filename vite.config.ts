// =============================================================================
// KAIROS FRONTEND - VITE CONFIGURATION
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// =============================================================================

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/contexts': path.resolve(__dirname, './src/contexts'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/stores': path.resolve(__dirname, './src/stores'),
      '@/assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 5173,
    host: true,
    open: true,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          state: ['zustand', '@tanstack/react-query'],
          ui: ['@headlessui/react', '@heroicons/react'],
          utils: ['clsx', 'date-fns', 'zod'],
        },
      },
    },
  },
});