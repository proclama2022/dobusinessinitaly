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
    assetsInlineLimit: 1024, // Ulteriormente ridotto per mobile (1kb)
    // Assicura che le immagini vengano copiate correttamente
    copyPublicDir: true,
    rollupOptions: {
      external: [],
      output: {
        // Mappa i percorsi delle immagini per Vercel
        assetFileNames: (assetInfo) => {
          // Se è un'immagine dalla cartella articles, mantieni il percorso originale
          if (assetInfo.name && assetInfo.name.includes('articles/')) {
            return `images/articles/[name]-[hash][extname]`;
          }
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash].[ext]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash].[ext]`;
        }
          return `assets/[name]-[hash].[extname]`;
        },
        manualChunks: {
          // React core - separato per evitare conflitti
          'react-vendor': ['react', 'react-dom'],

          // UI e componenti pesanti - ulteriormente divisi
          'radix-accordion': ['@radix-ui/react-accordion'],
          'radix-dialog': ['@radix-ui/react-dialog'],
          'radix-dropdown': ['@radix-ui/react-dropdown-menu'],

          // Internazionalizzazione
          'i18n': ['react-i18next', 'i18next'],

          // Routing e form
          'wouter': ['wouter'],
          'forms': ['react-hook-form'],

          // Utilities - divisi per ridurre chunk size
          'query': ['@tanstack/react-query'],
          'helmet': ['react-helmet-async'],
          'toast': ['sonner'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2, // Ridotto passaggi per evitare problemi
        unsafe_arrows: false,
        unsafe_methods: false,
        unsafe_proto: false,
        reduce_funcs: true,
        reduce_vars: true,
        sequences: true,
        dead_code: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        // Ottimizzazioni più sicure per mobile
        inline: 1,
        join_vars: true,
        collapse_vars: true,
        side_effects: true,
        properties: false,
        switches: true,
        if_return: true
      },
      mangle: {
        safari10: true, // Fix per Safari mobile
        toplevel: false, // Disabilitato per evitare problemi
        properties: false // Disabilitato per evitare problemi
      }
    },
    chunkSizeWarningLimit: 200 // Ancora più piccolo per mobile
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
