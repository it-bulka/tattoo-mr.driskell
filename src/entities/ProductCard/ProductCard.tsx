import cls from './ProductCard.module.scss'
import classNames from 'classnames'
import { LikeButton } from '@/features'
import { Tag, TagType } from '@/shared/ui'
import { ProductSlider } from '../ProductSlider/ProductSlider.tsx'
import { useState } from 'react';
import { Button } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

export type Product = {
  imgs: string[]
  title: string
  price: number
  id: number | string
  tags: TagType[]
}

interface ProductCardProps extends Omit<Product, 'id' | 'price' | 'tags'>{
  className?: string
  price: string
}
export const ProductCard = ({
  imgs,
  title,
  price
}: ProductCardProps) => {
  const [isHovered, setHovered] = useState(false)
  const {t} = useTranslation()
  return (
    <div
      className={classNames(cls.productCard, {}, [])}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={cls.content}>
        <div className={classNames(cls.additional, cls.cardContainer)}>
          <Tag />
          <LikeButton />
        </div>
        <ProductSlider slides={imgs}/>
      </div>
      <div className={classNames(cls.content, cls.cardContainer, cls.info)}>
        <h5 className={cls.title}>{title}</h5>
        <p className={cls.price}>{price}</p>
      </div>
      <div className={classNames(cls.btnWrapper,  { [cls.isShown]: isHovered })}>
        <Button max className={cls.btn}>
          {t('add tot cart')}
        </Button>
      </div>
    </div>
  )
}