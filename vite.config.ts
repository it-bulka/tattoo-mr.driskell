import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    plugins: [svgr(), react()],
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
    }
  }
})
