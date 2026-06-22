import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const ContactsPageLoader = memo(() => {
  return (
    <div className="container">
      <div className={cls.loader}>
        <Skeleton height={16} width={220} border="4px" />
        <Skeleton height={40} width={240} />

        <Skeleton height={20} width={160} border="4px" />
        <div className={cls.twoCol}>
          <div className={cls.colMain}>
            <Skeleton height={200} border="8px" />
          </div>
          <div className={cls.colSide}>
            <Skeleton height={200} border="8px" />
          </div>
        </div>

        <Skeleton height={20} width={160} border="4px" />
        <div className={cls.grid3}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} height={180} border="8px" />
          ))}
        </div>
      </div>
    </div>
  )
})

ContactsPageLoader.displayName = 'ContactsPageLoader'
