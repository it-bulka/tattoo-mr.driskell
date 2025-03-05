import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@/app/styles/index.scss"
import "@/app/styles/base.scss"

//swiper
import "../node_modules/swiper/swiper.min.css"
import "../node_modules/swiper/modules/grid.min.css"
import "../node_modules/swiper/modules/navigation.min.css"
import "../node_modules/swiper/modules/pagination.min.css"
import "@/app/styles/swiperAdditional.scss"
import { App } from '@/app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
