import cls from './TattooMachineSlider.module.scss'
import classNames from 'classnames'
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, Pagination } from 'swiper/modules';
import { useState, memo, useMemo, useId } from 'react'
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

const ThumbsBtns = memo(({
  setThumbsSwiper,
  slides,
}: ThumbsBtnsProps) => {

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
  const [_thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

  return (
    <>
      <ThumbsBtns slides={slides} setThumbsSwiper={setThumbsSwiper} />

      <Swiper
        //TODO: fix swiper bug, thumbs swiper is destroyed all the time, classList not founded
        //thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
        modules={[Thumbs]}
        className={classNames(cls.slider, cls.withThumbs)}
        simulateTouch={true}
        grabCursor={true}
      >
        {children}
      </Swiper>
    </>
  )
}

const PaginationSlider = ({
  children
}: PropsWithChildren<TattoMachineSliderProps>) => {
  const id = useId()
  if (!id) return null
  const uniqueId = `tattooMachineBullets-${id.replace(/[^a-zA-Z0-9-_]/g, '-')}`
  return (
    <>
      <Swiper
        modules={[Pagination]}
        pagination={{
          el: `#${uniqueId}`,
          bulletClass: "swiper-custom-bullet-mini",
          bulletActiveClass: "swiper-custom-bullet-mini-active",
          clickable: true,
          renderBullet: (_, className) => ReactDOMServer.renderToString(<div className={className}><div/></div>)
        }}
      >
        {children}
      </Swiper>

      <div id={uniqueId} className="swiper-bullets-container mini tattoo-machine-bullets"/>
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