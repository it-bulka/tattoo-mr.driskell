import cls from "./Testimonials.module.scss"
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import { Testimonial } from './Testimonial.tsx'
import { SliderDot } from '@/shared/ui/slider'
import ReactDOMServer from 'react-dom/server'
import { useTranslation } from 'react-i18next'
import { SliderButton } from '@/shared/ui/slider'
import { useRef } from 'react'
import classNames from 'classnames';
import { memo } from 'react'

const list = Array.from({ length: 10 })

interface IBtns {
  onPrevClick: () => void
  onNextClick: () => void
}
const Btns = memo(({ onPrevClick, onNextClick }: IBtns) => {
  return (
    <div className={classNames("swiper-container-with-btns swiper-btns-container", cls.btnWrapper)}>
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

Btns.displayName = 'TestimonialsBtns'

export const Testimonials = memo(() => {
  const {t} = useTranslation()
  const swiperRef = useRef<SwiperType>(null)
  return (
    <div>
      <h3 className="pageTitle margin-0 container">{t('testimonials')}</h3>
      <div className={cls.testimonials}>
        <Swiper
          className="testimonials-slider"
          modules={[Navigation, Pagination]}
          grabCursor={true}
          slidesPerView={1}
          slidesPerGroup={1}
          initialSlide={1}
          centeredSlides={false}
          spaceBetween={20}
          loop={true}
          speed={1200}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={{
            el: "#testimonialsBullets",
            bulletClass: "swiper-custom-bullet",
            bulletActiveClass: "swiper-custom-bullet-active",
            clickable: true,
            renderBullet: (_, className) => ReactDOMServer.renderToString(<SliderDot className={className}/>)
          }}
          breakpoints={{
            767: {
              navigation: false,
              slidesPerGroup: 2,
              slidesPerView: 3.4,
              initialSlide: 2
            }
          }}
        >
          {list.map((_, index) => (
            <SwiperSlide key={index}>
              <Testimonial />
            </SwiperSlide>
          ))}

        </Swiper>

        <Btns
          onPrevClick={()=> swiperRef.current?.slidePrev()}
          onNextClick={()=> swiperRef.current?.slideNext()}
        />
      </div>
      <div id="testimonialsBullets" className="swiper-bullets-container testimonials-bullets"/>
    </div>
  )
})

Testimonials.displayName = 'Testimonials'