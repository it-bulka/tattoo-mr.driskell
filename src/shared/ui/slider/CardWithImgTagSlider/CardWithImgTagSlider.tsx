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
  withAdaptation?: boolean
}
export const CardWithImgTagSlider = memo(({
  className,
  paginationId,
  imgs,
  tags,
  title,
  price,
  withAdaptation = true
}: CardWithImgTagSliderProps) => {
  return (
    <div className={classNames(cls.card, {[cls.clear]: withAdaptation}, [className])}>
      <PaginationSlider paginationId={paginationId}>
        {imgs.map((img) => (
          <SwiperSlide key={img}>
            <ImgSlide img={img} tags={tags} withAdaptation={withAdaptation}/>
          </SwiperSlide>
        ))}
      </PaginationSlider>
      <CardSliderContent title={title} price={price} withAdaptation={withAdaptation}/>
    </div>
  )
})

CardWithImgTagSlider.displayName = 'CardWithImgTagSlider'