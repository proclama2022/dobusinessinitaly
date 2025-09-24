import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import image from '@rollup/plugin-image';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react({
      // Ottimizzazioni React per performance
      babel: {
        plugins: [
          // Rimuove console.log in produzione
          process.env.NODE_ENV === 'production' && 'babel-plugin-transform-remove-console'
        ].filter(Boolean)
      }
    }),
    // Plugin ottimizzazione immagini
    image(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    target: 'es2020',
    minify: 'terser',
    sourcemap: false,
    // Ottimizzazioni aggressive per mobile
    cssCodeSplit: true,
    assetsInlineLimit: 2048, // Ridotto per mobile (2kb invece di 4kb)
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 3, // Triplo passaggio per compressione massima
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_proto: true,
        reduce_funcs: true,
        reduce_vars: true,
        sequences: true,
        dead_code: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true
      },
      mangle: {
        safari10: true, // Fix per Safari mobile
        toplevel: true // Mangle anche i nomi delle funzioni top-level
      }
    },
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          // React core - separato per evitare conflitti
          'react-core': ['react', 'react-dom'],

          // UI e componenti pesanti
          'ui-heavy': ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],

          // Internazionalizzazione
          'i18n': ['react-i18next', 'i18next'],

          // Routing e form
          'forms-routing': ['wouter', 'react-hook-form'],

          // Utilities e altri vendor
          'vendor': ['@tanstack/react-query', 'react-helmet-async', 'sonner'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash].[ext]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        }
      }
    },
    chunkSizeWarningLimit: 300 // Ancora più piccolo per mobile
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://do-business-network.vercel.app',
        changeOrigin: true,
        secure: false
      },
    },
  },
});
