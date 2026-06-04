import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const AboutPageLoader = memo(() => {
  return (
    <div>
      <Skeleton height={400} variant="dark" />
      <div className="container">
        <div className={cls.loader}>
          <Skeleton height={36} width={240} />
          <Skeleton height={280} border="8px" />
          <div className={cls.grid4}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={100} border="8px" />
            ))}
          </div>
          <div className={cls.grid4}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={80} border="8px" />
            ))}
          </div>
        </div>
      </div>
      <Skeleton height={200} variant="dark" />
      <Skeleton height={280} variant="dark" />
    </div>
  )
})

AboutPageLoader.displayName = 'AboutPageLoader'
