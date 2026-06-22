import { memo } from 'react'
import { Skeleton, ServiceCardSkeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const PromocodesPageLoader = memo(() => (
  <div className="container pageSpacing">
    <div className={cls.loader}>
      <Skeleton height={16} width={220} border="4px" />
      <Skeleton height={40} width={260} border="4px" />
      <div className={cls.cardsGrid}>
        {Array.from({ length: 3 }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
))

PromocodesPageLoader.displayName = 'PromocodesPageLoader'
