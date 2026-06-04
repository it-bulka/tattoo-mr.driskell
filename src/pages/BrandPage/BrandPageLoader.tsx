import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const BrandPageLoader = memo(() => {
  return (
    <div className="container">
      <div className={cls.loader}>
        <Skeleton height={16} width={220} border="4px" />
        <div className={cls.row}>
          <Skeleton height={80} width={80} border="50%" />
          <Skeleton height={36} width={200} />
        </div>
        <Skeleton height={44} border="4px" />
        <Skeleton height={44} border="4px" />
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

BrandPageLoader.displayName = 'BrandPageLoader'
