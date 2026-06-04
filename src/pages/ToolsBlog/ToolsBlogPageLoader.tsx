import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const ToolsBlogPageLoader = memo(() => {
  return (
    <div className="container">
      <div className={cls.loader}>
        <Skeleton height={16} width={220} border="4px" />
        <Skeleton height={48} width="60%" />
        <div className={cls.stack}>
          <Skeleton height={16} />
          <Skeleton height={16} />
          <Skeleton height={16} width="75%" />
          <Skeleton height={16} />
          <Skeleton height={16} width="60%" />
        </div>
        <div className={cls.stack}>
          <Skeleton height={32} width={240} />
          <Skeleton height={16} />
          <Skeleton height={16} />
          <Skeleton height={16} width="80%" />
        </div>
      </div>
    </div>
  )
})

ToolsBlogPageLoader.displayName = 'ToolsBlogPageLoader'
