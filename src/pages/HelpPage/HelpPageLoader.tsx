import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const HelpPageLoader = memo(() => {
  return (
    <div className="container">
      <div className={cls.loader}>
        <Skeleton height={16} width={220} border="4px" />
        <Skeleton height={40} width={200} />
        <div className={cls.stack}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} height={120} border="8px" />
          ))}
        </div>
      </div>
    </div>
  )
})

HelpPageLoader.displayName = 'HelpPageLoader'
