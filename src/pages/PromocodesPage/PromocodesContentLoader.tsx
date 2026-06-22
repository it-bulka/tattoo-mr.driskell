import { memo } from 'react'
import { ServiceCardSkeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'
import pageCls from './PromocodesPage.module.scss'

export const PromocodesContentLoader = memo(() => (
  <div className={`${cls.cardsGrid} ${pageCls.cardsGrid}`}>
    {Array.from({ length: 3 }).map((_, i) => (
      <ServiceCardSkeleton key={i} />
    ))}
  </div>
))

PromocodesContentLoader.displayName = 'PromocodesContentLoader'
