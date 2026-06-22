import { memo } from 'react'
import { Skeleton, ProductCardSkeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

const TAB_WIDTHS = [140, 160, 150, 100]

export const HomePageLoader = memo(() => {
  return (
    <div className="container pageSpacing">
      <div className={cls.tabsRow}>
        {TAB_WIDTHS.map((w, i) => (
          <Skeleton key={i} height={42} width={w} border="4px" />
        ))}
      </div>
      <div className={cls.grid4}>
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
})

HomePageLoader.displayName = 'HomePageLoader'
