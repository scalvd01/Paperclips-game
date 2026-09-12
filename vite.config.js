import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Splitting: vendor separado para mejor caché a largo plazo.
        manualChunks: {
          vendor: ['vue', 'vue-i18n', '@vueuse/core'],
          flowbite: ['flowbite']
        }
      }
    }
  }
})
