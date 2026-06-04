import { memo } from 'react'
import { ProductCardSkeleton } from '@/shared/ui/Skeleton'
import loaderCls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const CategoriesProductsLoader = memo(() => (
  <div className={loaderCls.grid3}>
    {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
  </div>
))

CategoriesProductsLoader.displayName = 'CategoriesProductsLoader'
