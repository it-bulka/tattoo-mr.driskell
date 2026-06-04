import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const DiscountPageLoader = memo(() => {
  return (
    <div className="container">
      <div className={cls.loader}>
        <Skeleton height={16} width={220} border="4px" />
        <Skeleton height={40} width={280} />
        <div className={cls.filterRow}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height={36} width={110} border="4px" />
          ))}
        </div>
        <div className={cls.grid3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={cls.productCard}>
              <Skeleton height={220} border="4px" />
              <Skeleton height={16} width="80%" />
              <Skeleton height={20} width="40%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

DiscountPageLoader.displayName = 'DiscountPageLoader'
