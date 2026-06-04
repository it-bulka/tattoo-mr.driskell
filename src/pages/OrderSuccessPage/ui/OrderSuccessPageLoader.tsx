import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const OrderSuccessPageLoader = memo(() => {
  return (
    <div className="container">
      <div className={cls.centered}>
        <Skeleton height={80} width={80} border="50%" />
        <Skeleton height={36} width={280} />
        <Skeleton height={20} width={200} />
        <Skeleton height={44} width={200} border="4px" />
      </div>
    </div>
  )
})

OrderSuccessPageLoader.displayName = 'OrderSuccessPageLoader'
