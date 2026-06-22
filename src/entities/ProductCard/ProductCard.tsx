import cls from './ProductCard.module.scss'
import classNames from 'classnames'
import { TagType, DiscountBadge } from '@/shared/ui'
import { useState } from 'react'
import { CardWithImgTagSlider } from '@/shared/ui'
import { AddToCartBtnWithCounter } from '@/features'

export type Product = {
  images: string[]
  title: string
  price: number
  priceCurrent?: number
  id: string
  tags: TagType[]
}

export type ProductWithAmount = Product & { quantity?: number }

type StaticStatus = 'on-all' | 'on-mobile' | 'on-tablet'

interface ProductCardProps {
  product: Product
  className?: string
  staticOn?: StaticStatus
  onClick?: () => void
}

const mapStatic: Record<StaticStatus, string> = {
  'on-mobile': cls.staticOnMobile,
  'on-all': cls.staticOnAll,
  'on-tablet': cls.staticOnTablet,
}

export const ProductCard = ({
  product,
  staticOn = 'on-tablet',
  onClick,
}: ProductCardProps) => {
  const [isHovered, setHovered] = useState(false)
  const { id, images, title, price, priceCurrent, tags } = product

  return (
    <div
      className={classNames(cls.productCard, {}, [mapStatic[staticOn]])}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {priceCurrent != null && <DiscountBadge price={price} priceCurrent={priceCurrent} />}
      <CardWithImgTagSlider
        paginationId={String(id)}
        imgs={images}
        title={title}
        tags={tags}
        price={priceCurrent ?? price}
        withAdaptation={false}
        itemId={String(id)}
      />

      <div className={classNames(cls.btnWrapper, { [cls.isShown]: isHovered })}>
        <AddToCartBtnWithCounter className={cls.btn} product={product} />
      </div>
    </div>
  )
}
