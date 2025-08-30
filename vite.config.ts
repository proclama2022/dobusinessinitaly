import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
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
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['wouter'],
          'vendor-i18n': ['react-i18next', 'i18next', 'i18next-browser-languagedetector'],
          'vendor-ui': ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'vendor-icons': ['@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons', '@fortawesome/react-fontawesome'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers'],
          // Page chunks
          'pages-home': ['./src/pages/Home.tsx'],
          'pages-blog': ['./src/pages/Blog.tsx', './src/pages/BlogPost.tsx'],
          'pages-services': ['./src/pages/Services.tsx', './src/pages/OpenCompanyItaly.tsx', './src/pages/OpenVATNumberItaly.tsx', './src/pages/TaxAccountingExpats.tsx'],
          'pages-other': ['./src/pages/About.tsx', './src/pages/Contact.tsx', './src/pages/Media.tsx', './src/pages/Social.tsx']
        }
      }
    },
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false
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
