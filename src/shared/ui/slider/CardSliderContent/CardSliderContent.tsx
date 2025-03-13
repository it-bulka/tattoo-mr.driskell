import cls from './CardSliderContent.module.scss'
import classNames from 'classnames'
import { currencyFormat } from '@/shared/libs'
import { AddToCartBtn } from '@/features/AddToCartBtn/AddToCartBtn.tsx'

interface CardSliderContentProps {
  className?: string
  title: string
  price: number
  addToCart?: boolean
}

export const CardSliderContent = ({
  className,
  price,
  title,
  addToCart = false
}: CardSliderContentProps) => {
  return (
    <div className={classNames(cls.cardContent, {}, [className])}>
      <p className={cls.title}>{title}</p>
      <p className={cls.price}>{currencyFormat(price)}</p>
      {addToCart && <AddToCartBtn />}
    </div>
  )
}