import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const NotFoundPageLoader = memo(() => {
  return (
    <div className="container">
      <div className={cls.centered}>
        <Skeleton height={60} width={300} border="4px" />
        <Skeleton height={20} width={400} />
        <Skeleton height={20} width={320} />
        <Skeleton height={44} width={160} border="4px" />
      </div>
    </div>
  )
})

NotFoundPageLoader.displayName = 'NotFoundPageLoader'
