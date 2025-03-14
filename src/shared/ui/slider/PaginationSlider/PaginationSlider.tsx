import { PropsWithChildren, memo, useState, useCallback, MouseEvent, TouchEvent } from 'react'
import { Swiper } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import ReactDOMServer from 'react-dom/server'
import classNames from 'classnames'

interface PaginationSliderProps {
  className?: string
  paginationId: string
  dotsType?: 'small' | 'large',
  dotsPosition?: "overlap" | "outside",
  spaceBetween?: number,
  slidesPerView?: number,
  loop?: boolean,
  speed?: number,
}

export const PaginationSlider = memo(({
  children,
  className,
  paginationId,
  dotsType = 'small',
  dotsPosition = 'overlap',
  spaceBetween = 2,
  slidesPerView = 1,
  loop = false,
  speed
}: PropsWithChildren<PaginationSliderProps>) => {
  const [isReady, setIsReady] = useState<boolean>(false)

  const refCb = useCallback((nodeRef: HTMLElement | null) => {
    if(nodeRef !== null) {
      setIsReady(true)
    }
  }, [setIsReady])

  const stopPropagation = (e: MouseEvent | TouchEvent | PointerEvent) => e.stopPropagation()

  return (
    <div className={classNames('paginationSwiper', [className])}>
      {isReady && (
        <Swiper
          onTouchStart={(_, e) => e.stopPropagation()}
          onWheel={stopPropagation}
          grabCursor={true}
          modules={[Pagination]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          loop={loop}
          speed={speed}
          pagination={{
            el: `#${paginationId}`,
            bulletClass: dotsType === 'small' ? "swiper-custom-bullet-mini" : "swiper-custom-bullet",
            bulletActiveClass: dotsType === 'small' ? "swiper-custom-bullet-mini-active" : "swiper-custom-bullet-active",
            clickable: true,
            renderBullet: (_, className) => ReactDOMServer.renderToString(<div className={className}><div/></div>)
          }}
        >
          {children}
        </Swiper>
      )}

      <div
        ref={refCb}
        id={paginationId}
        className={classNames(
          "swiper-bullets-container",
          { "mini": dotsType === 'small'},
          [dotsPosition])}
      />
    </div>
  )
})

PaginationSlider.displayName = 'PaginationSlider'