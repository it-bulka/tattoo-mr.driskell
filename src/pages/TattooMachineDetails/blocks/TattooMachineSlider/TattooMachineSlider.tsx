import cls from './TattooMachineSlider.module.scss'
import classNames from 'classnames'
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, Pagination } from 'swiper/modules';
import { useState, memo, useMemo } from 'react'
import { ImgSlide } from '@/shared/ui'
import ReactDOMServer from 'react-dom/server'
import { PropsWithChildren } from 'react'
import { TagType } from '@/shared/ui'

interface TattoMachineSliderProps {
  className?: string
  slides: string[]
  isMobile?: boolean
}

interface ThumbsBtnsProps {
  setThumbsSwiper: (swiper: SwiperType) => void
  slides: string[]
}
let rerender = 0
const ThumbsBtns = memo(({
  setThumbsSwiper,
  slides,
}: ThumbsBtnsProps) => {
  console.log('SHOW: rerender', rerender + 1)
  return (
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
        <SwiperSlide key={slide}>
          <img src={slide} alt="tatoo machine image" className={cls.img}/>
        </SwiperSlide>
      ))}
    </Swiper>
  )
})

const ThumbsSlider = ({
  slides,
  children
}: PropsWithChildren<TattoMachineSliderProps>) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

  return (
    <>
      <ThumbsBtns slides={slides} setThumbsSwiper={setThumbsSwiper} />

      <Swiper
        thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
        modules={[Thumbs]}
        className={classNames(cls.slider, cls.withThumbs)}
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
  tags,
  isMobile = false,
  machineId
}: TattoMachineSliderProps & { machineId: string, tags: TagType[]}) => {

  const slidesContent = useMemo(() => {
    return slides.map(slide => (
      <SwiperSlide key={slide}>
        <ImgSlide id={machineId} tags={tags} img={slide} alt="tatoo machine image" className={cls.slide}/>
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