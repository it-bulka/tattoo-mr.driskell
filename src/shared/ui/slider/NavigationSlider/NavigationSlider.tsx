import classNames from 'classnames'

import { memo, useRef, PropsWithChildren } from 'react'
import { SliderButton } from '@/shared/ui'
import { Swiper } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import { Navigation } from 'swiper/modules'
import { SwiperOptions } from 'swiper/types'

interface NavigationSliderProps extends SwiperOptions{
  className?: string
}

interface IBtns {
  onPrevClick: () => void
  onNextClick: () => void
}

const Btns = memo(({ onPrevClick, onNextClick }: IBtns) => {
  return (
    <div className={classNames("swiper-btns-container-2")}>
      <SliderButton
        className={"prev"}
        onClick={onPrevClick}
      />

      <SliderButton
        next
        className="next"
        onClick={onNextClick}
      />
    </div>
  )
})

Btns.displayName = 'NavigationSliderBtns'

export const NavigationSlider = memo(({
  className,
  children,
  spaceBetween = 20,
  slidesPerView = 4,
  loop = false,
  speed,
  modules,
  ...rest
}: PropsWithChildren<NavigationSliderProps>) => {
  const swiperRef = useRef<SwiperType>(null)

  return (
    <div className={classNames('container-slider-nav', {}, [className])}>
      <Swiper
        modules={modules ? [...modules, Navigation] : [Navigation]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        speed={speed}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        {...rest}
      >
        {children}
      </Swiper>

      <Btns
        onPrevClick={()=> swiperRef.current?.slidePrev()}
        onNextClick={()=> swiperRef.current?.slideNext()}
      />
    </div>
  )
})

NavigationSlider.displayName = 'NavigationSlider'