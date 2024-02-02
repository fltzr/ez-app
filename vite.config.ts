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
    rollupOptions: {
      output: {
        experimentalMinChunkSize: 500,
        entryFileNames: 'assets/public/[name].[hash].js',
        chunkFileNames: 'assets/chunks/[name].[hash].js',
        assetFileNames: 'assets/vendor/[name].[hash].[ext]',
        manualChunks: id => {
          if (id.includes('components/spinner')) {
            return 'spinner';
          }
          if (id.includes('react-dom')) {
            return 'react-dom';
          }
        },
      },
    },
  },
});
