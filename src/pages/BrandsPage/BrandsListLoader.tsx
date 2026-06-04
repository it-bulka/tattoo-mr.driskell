import { memo } from 'react'
import { BrandCardSkeleton } from '@/shared/ui/Skeleton'
import cls from './BrandsPage.module.scss'

export const BrandsListLoader = memo(() => (
  <div className={cls.grid}>
    {Array.from({ length: 8 }).map((_, i) => <BrandCardSkeleton key={i} />)}
  </div>
))

BrandsListLoader.displayName = 'BrandsListLoader'
