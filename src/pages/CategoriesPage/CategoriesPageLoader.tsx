import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'
import pageCls from './CategoriesPage.module.scss'
import { ProductCardSkeleton } from '@/shared/ui/Skeleton'

export const CategoriesPageLoader = memo(() => {
  return (
    <div className={pageCls.pageWrapper}>
      <div className="container">
        <div className={cls.loader}>
          <Skeleton height={16} width={220} border="4px" />
          <Skeleton height={48} width={320} border="4px" />
          <div className={cls.filterRow}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} height={40} width={i > 2 ? 140 : 80} border="24px" />
            ))}
          </div>
          <Skeleton height={56} border="16px" />
          <div className={cls.grid3}>
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

CategoriesPageLoader.displayName = 'CategoriesPageLoader'
