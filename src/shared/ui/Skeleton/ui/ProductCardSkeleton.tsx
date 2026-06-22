import { memo } from 'react'
import { Skeleton } from './Skeleton'
import cls from './pageLoader.module.scss'

export const ProductCardSkeleton = memo(() => (
  <div className={cls.productCard}>
    <Skeleton height={240} />
    <div className={cls.productCardContent}>
      <Skeleton height={16} width="80%" border="6px" />
      <Skeleton height={24} width="50%" border="6px" />
    </div>
  </div>
))

ProductCardSkeleton.displayName = 'ProductCardSkeleton'
