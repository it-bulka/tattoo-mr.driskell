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
      chunkSizeWarningLimit: 400,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router'],
            'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
            'vendor-motion': ['framer-motion'],
            'vendor-swiper': ['swiper'],
            'vendor-form': ['react-hook-form', 'zod'],
            'vendor-i18n': ['i18next', 'react-i18next', 'i18next-http-backend', 'i18next-localstorage-backend', 'i18next-chained-backend'],
            'vendor-ui': ['react-select', 'react-toastify'],
          },
        },
      },
    },
  }
})
