import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const AdditionalServicePageLoader = memo(() => {
  return (
    <div className="container">
      <div className={cls.loader}>
        <Skeleton height={16} width={220} border="4px" />
        <Skeleton height={40} width={260} />
        <div className={cls.twoCol}>
          <div className={cls.colMain}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={64} border="8px" />
            ))}
          </div>
          <div className={cls.colSide}>
            <Skeleton height={200} border="8px" />
          </div>
        </div>
      </div>
    </div>
  )
})

AdditionalServicePageLoader.displayName = 'AdditionalServicePageLoader'
