import cls from './ProductCard.module.scss'
import classNames from 'classnames'
import { TagType } from '@/shared/ui'
import { useState } from 'react';
import { CardWithImgTagSlider } from '@/shared/ui'
import { AddToCartBtnWithCounter } from '@/features'

export type Product = {
  images: string[]
  title: string
  price: number
  priceCurrent?: number
  id: string
  tags: TagType[]
  onClick?: () => void
}

type StaticStatus = 'on-all' | 'on-mobile' | 'on-tablet'
interface ProductCardProps extends Product{
  className?: string
  staticOn?: StaticStatus
}

const mapStatic: Record<StaticStatus, string> = {
  'on-mobile': cls.staticOnMobile,
  'on-all': cls.staticOnAll,
  'on-tablet': cls.staticOnTablet
}

export const ProductCard = ({
  images,
  title,
  price,
  tags,
  id,
  staticOn = 'on-tablet',
  onClick
}: ProductCardProps) => {
  const [isHovered, setHovered] = useState(false)
  return (
    <div
      className={classNames(cls.productCard, {}, [mapStatic[staticOn]])}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <CardWithImgTagSlider
        paginationId={String(id)}
        imgs={images}
        title={title}
        tags={tags}
        price={price}
        withAdaptation={false}
        itemId={String(id)}
      />

      <div className={classNames(cls.btnWrapper,  { [cls.isShown]: isHovered })}>
        <AddToCartBtnWithCounter max className={cls.btn} productId={String(id)}/>
      </div>
    </div>
  )
}