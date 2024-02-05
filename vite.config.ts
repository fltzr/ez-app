/// <reference types="vitest" />

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths({ projects: ['./tsconfig.json'] }),
    splitVendorChunkPlugin(),
  ],

  server: {
    strictPort: true,
    host: '0.0.0.0',
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://192.168.1.155:3000',
        changeOrigin: true,
      },
    },
    open: false,
  },

  preview: {
    port: 4000,
    open: false,
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 8000,
    rollupOptions: {
      output: {
        experimentalMinChunkSize: 500,
        entryFileNames: 'assets/public/[name].[hash].js',
        chunkFileNames: 'assets/chunks/[name].[hash].js',
        assetFileNames: 'assets/vendor/[name].[hash].[ext]',
      },
    },
  },

  test: {
    name: 'Ez App',

    environment: 'happy-dom',
  },
});
