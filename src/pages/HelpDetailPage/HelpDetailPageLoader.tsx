import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const HelpDetailPageLoader = memo(() => (
  <div className="container">
    <div className={cls.loader}>
      <Skeleton height={16} width={260} border="4px" />
      <Skeleton height={40} width={320} />
      <Skeleton height={60} width="60%" border="6px" />
      <div className={cls.stack}>
        <Skeleton height={24} width={200} border="4px" />
        <Skeleton height={80} width="60%" border="6px" />
      </div>
      <div className={cls.stack}>
        <Skeleton height={24} width={240} border="4px" />
        <Skeleton height={80} width="60%" border="6px" />
      </div>
      <div className={cls.stack}>
        <Skeleton height={24} width={180} border="4px" />
        <Skeleton height={80} width="60%" border="6px" />
      </div>
    </div>
  </div>
))

HelpDetailPageLoader.displayName = 'HelpDetailPageLoader'
