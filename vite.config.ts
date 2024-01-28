import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths({ projects: ['./tsconfig.json'] })],

  server: {
    strictPort: true,
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
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
  },
});
