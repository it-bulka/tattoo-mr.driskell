import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'

export const CartPageLoader = memo(() => {
  return (
    <div className="container">
      <div className={cls.loader}>
        <Skeleton height={16} width={220} border="4px" />
        <div className={cls.twoCol}>
          <div className={cls.colMain}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={cls.cartItem}>
                <Skeleton height={80} width={80} border="4px" />
                <div className={cls.cartItemInfo}>
                  <Skeleton height={16} width="70%" />
                  <Skeleton height={16} width="40%" />
                </div>
                <Skeleton height={24} width={80} />
              </div>
            ))}
          </div>
          <div className={cls.colSide}>
            <Skeleton height={220} border="8px" />
          </div>
        </div>
      </div>
    </div>
  )
})

CartPageLoader.displayName = 'CartPageLoader'
