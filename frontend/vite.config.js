import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Ensure React is properly handled
      jsxRuntime: 'automatic',
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production for security
    minify: 'esbuild',
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress sourcemap warnings
        if (warning.code === 'SOURCEMAP_ERROR' || warning.message?.includes('sourcemap')) {
          return;
        }
        warn(warning);
      },
      output: {
        // Optimized manual chunk splitting for better caching
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // CRITICAL: Keep React and ReactDOM in the same chunk
            // This prevents "Cannot read properties of undefined" errors
            // Check for react or react-dom packages (but not react-router, react-query, etc.)
            if (
              (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) &&
              !id.includes('react-router') &&
              !id.includes('react-query') &&
              !id.includes('react-leaflet')
            ) {
              return 'react-vendor';
            }
            // React Router can be separate
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            // UI libraries
            if (id.includes('framer-motion') || id.includes('@mantine')) {
              return 'ui-vendor';
            }
            // Map libraries
            if (id.includes('leaflet') || id.includes('react-leaflet')) {
              return 'map-vendor';
            }
            // Other node_modules
            return 'vendor';
          }
        },
        // Add hash to filenames for cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  define: {
    // Ensure environment variables are properly replaced
    'import.meta.env.DEV': JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
})
