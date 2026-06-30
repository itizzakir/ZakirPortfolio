import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          const normalizedId = id.replaceAll('\\', '/')
          if (normalizedId.includes('/@react-three/') || normalizedId.includes('/three/')) return 'three'
          if (normalizedId.includes('/framer-motion/') || normalizedId.includes('/gsap/') || normalizedId.includes('/lenis/')) return 'animation'
          if (normalizedId.includes('/lucide-react/') || normalizedId.includes('/react-icons/') || normalizedId.includes('/@radix-ui/')) return 'ui'
          if (
            normalizedId.includes('/react/') ||
            normalizedId.includes('/react-dom/') ||
            normalizedId.includes('/react-router-dom/') ||
            normalizedId.includes('/scheduler/')
          ) {
            return 'react'
          }
          return 'vendor'
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
})
