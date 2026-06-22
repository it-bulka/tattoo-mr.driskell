import { memo } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/shared/ui/Skeleton/ui/pageLoader.module.scss'
import pageCls from './CartPage.module.scss'
import classNames from 'classnames'

const CartItemSkeleton = () => (
  <div className={cls.cartItem}>
    <Skeleton height={80} width={80} border="8px" />
    <div className={cls.cartItemInfo}>
      <Skeleton height={16} width="70%" border="4px" />
      <Skeleton height={14} width="45%" border="4px" />
    </div>
    <Skeleton height={20} width={80} border="4px" />
  </div>
)

const FormSkeleton = () => (
  <div className={cls.stack}>
    <Skeleton height={20} width={160} border="4px" />
    <Skeleton height={48} width="100%" border="14px" />
    <Skeleton height={48} width="100%" border="14px" />
    <Skeleton height={48} width="100%" border="14px" />
  </div>
)

const SidebarSkeleton = () => (
  <div className={cls.stackSm} style={{ padding: '1.875rem 2.5rem 2.5rem' }}>
    <Skeleton height={18} width="60%" border="4px" />
    <Skeleton height={18} width="80%" border="4px" />
    <Skeleton height={1} width="100%" style={{ margin: '1rem 0' }} />
    <Skeleton height={24} width="70%" border="4px" />
    <Skeleton height={48} width="100%" border="0" style={{ marginTop: '1.5rem' }} />
  </div>
)

export const CartPageLoader = memo(() => (
  <div className={classNames(pageCls.cartPage, 'container')}>
    <div className={cls.loader}>
      <Skeleton height={16} width={220} border="4px" />
      <Skeleton height={40} width={180} border="4px" />
      <div className={pageCls.content}>
        <div className={pageCls.cart}>
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
        </div>
        <div className={pageCls.form}>
          <FormSkeleton />
        </div>
        <div className={pageCls.additional}>
          <SidebarSkeleton />
        </div>
      </div>
    </div>
  </div>
))

CartPageLoader.displayName = 'CartPageLoader'
