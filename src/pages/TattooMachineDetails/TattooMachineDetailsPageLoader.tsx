import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const TattooMachineDetailsPageLoader = memo(() => {
  return (
    <div className="container">
      <div className={cls.loader}>
        <Skeleton height={16} width={280} border="4px" />
        <div className={cls.twoCol}>
          <Skeleton height={400} width="50%" border="8px" />
          <div className={cls.colMain}>
            <Skeleton height={36} width="85%" />
            <Skeleton height={24} width="40%" />
            <Skeleton height={20} width="70%" />
            <Skeleton height={20} width="60%" />
            <Skeleton height={20} width="50%" />
            <Skeleton height={48} width={180} border="4px" />
          </div>
        </div>
        <Skeleton height={200} border="8px" />
        <div className={cls.stack}>
          <Skeleton height={32} width={240} />
          <div className={cls.grid4}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={cls.productCard}>
                <Skeleton height={180} border="4px" />
                <Skeleton height={16} width="80%" />
                <Skeleton height={20} width="40%" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

TattooMachineDetailsPageLoader.displayName = 'TattooMachineDetailsPageLoader'
