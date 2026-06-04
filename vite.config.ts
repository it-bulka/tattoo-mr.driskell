import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    plugins: [
      svgr(),
      react(),
      mode === 'analyze' && visualizer({
        open: true,
        gzipSize: true,
        filename: 'dist/stats.html',
        template: 'treemap',
      }),
    ].filter(Boolean),
    resolve: {
      alias: [
        { find: '@', replacement: '/src' }
      ]
    },
    define: {
      __IS_DEV__: JSON.stringify(isDev)
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/app/styles/_mixins.scss" as *;`
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (
              id.includes('/react-dom/') ||
              id.includes('/react/') ||
              id.includes('/react-router/') ||
              id.includes('/scheduler/')
            ) return 'vendor-react'
            if (
              id.includes('/@reduxjs/') ||
              id.includes('/react-redux/') ||
              id.includes('/redux/') ||
              id.includes('/immer/') ||
              id.includes('/reselect/') ||
              id.includes('/redux-thunk/')
            ) return 'vendor-redux'
            if (id.includes('/framer-motion/')) return 'vendor-motion'
            if (id.includes('/swiper/')) return 'vendor-swiper'
            if (
              id.includes('/react-hook-form/') ||
              id.includes('/zod/') ||
              id.includes('/@hookform/')
            ) return 'vendor-form'
            if (
              id.includes('/i18next') ||
              id.includes('/react-i18next/') ||
              id.includes('/@babel/')
            ) return 'vendor-i18n'
            if (
              id.includes('/react-select/') ||
              id.includes('/react-toastify/') ||
              id.includes('/@emotion/')
            ) return 'vendor-ui'
          },
        },
      },
    },
  }
})
