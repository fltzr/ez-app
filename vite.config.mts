/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import { checker } from "vite-plugin-checker";
import tsConfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  console.log(`env.${mode}`, env);

  return {
    plugins: [
      react(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      checker({
        overlay: {
          initialIsOpen: false,
          position: "tr",
        },
        typescript: true,
        eslint: {
          useFlatConfig: true,
          lintCommand: "eslint .",
          dev: {
            logLevel: ["error"],
          },
        },
      }),
      splitVendorChunkPlugin(),
      visualizer(),
    ],

    server: {
      strictPort: true,
      host: "0.0.0.0",
      port: 4000,
      proxy: {
        "/api": {
          target: "http://192.168.1.155:3000",
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
      sourcemap: true,
      outDir: "dist",
      emptyOutDir: true,
      assetsInlineLimit: 8000,
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 500,
          entryFileNames: "assets/public/[name].[hash].js",
          chunkFileNames: "assets/chunks/[name].[hash].js",
          assetFileNames: "assets/vendor/[name].[hash].[ext]",
          manualChunks: {
            react: ["react", "react-dom"],
          },
        },
      },
    },

    test: {
      name: "Ez App",
      globals: true,
      environment: "happy-dom",
      include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    },
  };
});
