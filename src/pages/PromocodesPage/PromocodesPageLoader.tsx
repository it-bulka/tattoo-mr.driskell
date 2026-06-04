import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const PromocodesPageLoader = memo(() => {
  return (
    <div className="container">
      <div className={cls.loader}>
        <Skeleton height={16} width={220} border="4px" />
        <Skeleton height={40} width={300} />
        <div className={cls.grid3}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} height={120} border="8px" />
          ))}
        </div>
      </div>
    </div>
  )
})

PromocodesPageLoader.displayName = 'PromocodesPageLoader'
