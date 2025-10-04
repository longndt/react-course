import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern browsers for smaller bundles
    target: 'esnext',

    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,     // Remove console.* in production
        drop_debugger: true,    // Remove debugger statements
        pure_funcs: ['console.log'], // Remove specific functions
      },
    },

    // Source maps (useful for debugging production issues)
    sourcemap: false, // Set to true if you want source maps in production

    // Rollup options for advanced bundling
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // React core libraries in one chunk
          'react-vendor': ['react', 'react-dom'],

          // React Router in separate chunk
          'router-vendor': ['react-router-dom'],

          // Add more vendor chunks as needed
          // Example: 'ui-vendor': ['@mui/material'],
        },

        // Asset naming for cache busting
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') ?? [];
          const ext = info[info.length - 1];

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/woff|woff2/.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }

          return `assets/[name]-[hash][extname]`;
        },

        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 1000, // KB
  },

  // Development server config
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    open: true,
  },

  // Preview server config (for testing production build locally)
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
    open: true,
  },
});
