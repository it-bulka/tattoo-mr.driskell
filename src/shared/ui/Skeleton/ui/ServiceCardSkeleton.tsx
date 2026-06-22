import { memo } from 'react'
import { Skeleton } from './Skeleton'
import cls from './pageLoader.module.scss'

interface ServiceCardSkeletonProps {
  withImage?: boolean
}

export const ServiceCardSkeleton = memo(({ withImage = true }: ServiceCardSkeletonProps) => (
  <div className={cls.serviceCard}>
    {withImage && <Skeleton style={{ height: 'auto', aspectRatio: '392 / 230', width: '100%' }} />}
    <div className={cls.serviceCardContent}>
      <Skeleton height={22} width="50%" border="4px" />
      <Skeleton height={14} width="90%" border="4px" />
      <Skeleton height={14} width="70%" border="4px" />
      <Skeleton height={14} width="40%" border="4px" />
      <Skeleton height={48} width="100%" border="0" style={{ marginTop: 'auto' }} />
    </div>
  </div>
))

ServiceCardSkeleton.displayName = 'ServiceCardSkeleton'
