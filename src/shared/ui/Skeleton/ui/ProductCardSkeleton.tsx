import { memo } from 'react'
import { Skeleton } from './Skeleton'
import cls from './pageLoader.module.scss'

export const ProductCardSkeleton = memo(() => (
  <div className={cls.productCard}>
    <Skeleton height={220} border="4px" />
    <Skeleton height={16} width="80%" />
    <Skeleton height={20} width="40%" />
  </div>
))

ProductCardSkeleton.displayName = 'ProductCardSkeleton'
