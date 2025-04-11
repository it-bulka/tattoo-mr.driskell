import classNames from 'classnames'
import { SwiperSlide } from 'swiper/react';
import { ImgSlide } from '@/shared/ui';
import { PaginationSlider } from '@/shared/ui/slider/PaginationSlider/PaginationSlider.tsx';
import { WithCheckbox } from '../ImgSlide/ImgSlide.tsx'
import { memo } from 'react'
import { CardSliderContent } from '@/shared/ui/slider/CardSliderContent/CardSliderContent.tsx';
import cls from '../general.module.scss'
import { Link } from 'react-router'
import { getTattooMachineDetailsPage } from '@/shared/config/routeConfig/routeConfig.tsx'

interface CardWithImgTagSliderProps extends WithCheckbox {
  className?: string
  paginationId: string
  imgs: string[]
  title: string
  price: number
  productId: string | number
}
export const CardWithImgCheckboxSlider = memo(({
  className,
  paginationId,
  imgs,
  checked,
  onCheckClick,
  title,
  price,
  productId
}: CardWithImgTagSliderProps) => {
  return (
    <Link
      to={getTattooMachineDetailsPage(String(productId))}
      className={classNames(cls.card, {}, [className])}
    >
      <PaginationSlider paginationId={paginationId}>
        {imgs.map((img) => (
          <SwiperSlide key={img} >
            <ImgSlide id={String(productId)} img={img} checked={checked} onCheckClick={onCheckClick} withAdaptation/>
          </SwiperSlide>
        ))}
      </PaginationSlider>
      <CardSliderContent title={title} price={price} withAdaptation/>
    </Link>
  )
})

CardWithImgCheckboxSlider.displayName = 'CardWithImgCheckboxSlider'