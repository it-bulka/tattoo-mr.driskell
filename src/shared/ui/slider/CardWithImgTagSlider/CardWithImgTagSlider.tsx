import classNames from 'classnames'
import cls from '../general.module.scss'
import { SwiperSlide } from 'swiper/react';
import { ImgSlide } from '@/shared/ui';
import { PaginationSlider } from '@/shared/ui/slider/PaginationSlider/PaginationSlider.tsx';
import { memo } from 'react'
import { CardSliderContent } from '../CardSliderContent/CardSliderContent.tsx';
import { TagType } from '@/shared/ui'

interface CardWithImgTagSliderProps {
  className?: string
  paginationId: string
  imgs: string[]
  title: string
  price: number
  tags: TagType[]
}
export const CardWithImgTagSlider = memo(({
  className,
  paginationId,
  imgs,
  tags,
  title,
  price
}: CardWithImgTagSliderProps) => {
  return (
    <div className={classNames(cls.card, {}, [className])}>
      <PaginationSlider paginationId={paginationId}>
        {imgs.map((img) => (
          <SwiperSlide key={img} >
            <ImgSlide img={img} tags={tags} withAdaptation/>
          </SwiperSlide>
        ))}
      </PaginationSlider>
      <CardSliderContent title={title} price={price}/>
    </div>
  )
})

CardWithImgTagSlider.displayName = 'CardWithImgTagSlider'