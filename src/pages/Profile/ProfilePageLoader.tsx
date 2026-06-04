import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const ProfilePageLoader = memo(() => {
  return (
    <div className="container">
      <div className={cls.loader}>
        <Skeleton height={16} width={220} border="4px" />
        <Skeleton height={40} width={200} />
        <div className={cls.twoCol}>
          <div className={cls.colMain}>
            <Skeleton height={48} border="4px" />
            <Skeleton height={48} border="4px" />
            <Skeleton height={48} border="4px" />
            <Skeleton height={48} border="4px" />
            <Skeleton height={44} width={160} border="4px" />
          </div>
          <div className={cls.colSideNarrow}>
            <Skeleton height={180} border="8px" />
          </div>
        </div>
      </div>
    </div>
  )
})

ProfilePageLoader.displayName = 'ProfilePageLoader'
