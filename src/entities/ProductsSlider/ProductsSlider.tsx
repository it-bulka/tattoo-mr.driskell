import { PaginationSlider } from '@/shared/ui'
import { Product, ProductCard } from '../ProductCard/ProductCard.tsx';
import { memo } from 'react';
import { SwiperSlide } from 'swiper/react'

interface ProductsSliderProps {
  className?: string
  sliderId: string
  list: Product[]
}
export const ProductsSlider = memo(({
  className,
  sliderId,
  list
}: ProductsSliderProps) => {
  return (
    <PaginationSlider
      className={className}
      paginationId={sliderId}
      dotsPosition={'outside'}
      dotsType='large'
      slidesPerView={1}
      spaceBetween={20}
      speed={1200}
      loop
      breakpoints={{
        480: {
          slidesPerView: 2,
        },
        800: {
          slidesPerView: 3,
        }
      }}
    >
      {list.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard
            product={product}
            staticOn="on-all"
          />
        </SwiperSlide>
      ))}
    </PaginationSlider>
  )
})

ProductsSlider.displayName = 'ProductsSlider'