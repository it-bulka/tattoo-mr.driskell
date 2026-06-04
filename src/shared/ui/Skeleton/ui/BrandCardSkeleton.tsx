import { memo } from 'react'
import { Skeleton } from './Skeleton'
import cls from './pageLoader.module.scss'

export const BrandCardSkeleton = memo(() => (
  <div className={cls.brandCard}>
    <Skeleton height={80} width={160} border="4px" />
    <Skeleton height={16} width="70%" />
  </div>
))

BrandCardSkeleton.displayName = 'BrandCardSkeleton'
