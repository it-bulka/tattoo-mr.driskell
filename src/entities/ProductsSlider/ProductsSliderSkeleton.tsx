import { memo } from 'react'
import { ProductCardSkeleton } from '@/shared/ui/Skeleton'
import cls from './ProductsSliderSkeleton.module.scss'

const SKELETON_COUNT = 3

export const ProductsSliderSkeleton = memo(() => (
  <div className={cls.wrapper}>
    {Array.from({ length: SKELETON_COUNT }, (_, i) => (
      <div className={cls.item} key={i}>
        <ProductCardSkeleton />
      </div>
    ))}
  </div>
))

ProductsSliderSkeleton.displayName = 'ProductsSliderSkeleton'
