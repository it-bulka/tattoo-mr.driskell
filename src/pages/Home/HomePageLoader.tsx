import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const HomePageLoader = memo(() => {
  return (
    <div>
      <Skeleton height={500} variant="dark" />
      <div className="container">
        <div className={cls.loader}>
          <Skeleton height={32} width={260} />
          <div className={cls.grid4}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={cls.productCard}>
                <Skeleton height={220} border="4px" />
                <Skeleton height={16} width="80%" />
                <Skeleton height={20} width="40%" />
              </div>
            ))}
          </div>
          <Skeleton height={300} border="8px" />
        </div>
      </div>
      <Skeleton height={200} variant="dark" />
    </div>
  )
})

HomePageLoader.displayName = 'HomePageLoader'
