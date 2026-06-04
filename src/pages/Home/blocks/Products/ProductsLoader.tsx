import { memo } from 'react'
import { ProductCardSkeleton } from '@/shared/ui/Skeleton'
import loaderCls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const ProductsLoader = memo(() => (
  <div className={loaderCls.grid4}>
    {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
  </div>
))

ProductsLoader.displayName = 'ProductsLoader'
