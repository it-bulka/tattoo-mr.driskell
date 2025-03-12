import cls from './TattooMachineSlider.module.scss'
import classNames from 'classnames'
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'
import { Thumbs, Pagination } from 'swiper/modules';
import { useState, memo, useMemo } from 'react'
import { type Slide, ImgSlide } from '@/shared/ui'
import ReactDOMServer from 'react-dom/server'
import { PropsWithChildren } from 'react'

interface TattoMachineSliderProps {
  className?: string
  slides: Slide[]
  isMobile?: boolean
}

const ThumbsSlider = ({
  slides,
  children
}: PropsWithChildren<TattoMachineSliderProps>) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

  const swiperProps = useMemo(() => {
    const withThumbs: SwiperProps = {
      thumbs: { swiper: thumbsSwiper },
      modules: [Thumbs],
      className: classNames(cls.slider, cls.withThumbs)
    }

    return withThumbs
  }, [thumbsSwiper])
  return (
    <>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Thumbs]}
        direction="vertical"
        className="swiper-tattoo-machine"

      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img src={slide.img} alt="tatoo machine image" className={cls.img}/>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        {...swiperProps}
      >
        {children}
      </Swiper>
    </>
  )
}

const PaginationSlider = ({
  children
}: PropsWithChildren<TattoMachineSliderProps>) => {
  return (
    <>
      <Swiper
        modules={[Pagination]}
        pagination={{
          el: "#tattooMachineBullets",
          bulletClass: "swiper-custom-bullet-mini",
          bulletActiveClass: "swiper-custom-bullet-mini-active",
          clickable: true,
          renderBullet: (_, className) => ReactDOMServer.renderToString(<div className={className}><div/></div>)
        }}
      >
        {children}
      </Swiper>

      <div id="tattooMachineBullets" className="swiper-bullets-container mini tattoo-machine-bullets"/>
    </>
  )
}

export const TattooMachineSlider = memo(({
  className,
  slides,
  isMobile = false
}: TattoMachineSliderProps) => {

  const slidesContent = useMemo(() => {
    return slides.map(slide => (
      <SwiperSlide key={slide.id}>
        <ImgSlide tags={slide.tags} img={slide.img} alt="tatoo machine image" className={cls.slide}/>
      </SwiperSlide>
    ))
  }, [slides])

  return (
    <div className={classNames(cls.sliderWrapper, 'tattoo-machine-slider', {}, [className])}>
      {isMobile ? (
        <PaginationSlider slides={slides}>
          {slidesContent}
        </PaginationSlider>
      ):(
        <ThumbsSlider slides={slides}>
          {slidesContent}
        </ThumbsSlider>
      )}
    </div>
  )
})