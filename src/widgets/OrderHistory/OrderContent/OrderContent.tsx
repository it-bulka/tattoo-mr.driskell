import cls from './OrderContent.module.scss'
import clsGeneral from '../OrderHistory.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { cartList } from '@/mockData.tsx';
import { Cart } from '@/entities/Cart';
import { memo } from 'react';

interface OrderContentProps {
  className?: string
}
export const OrderContent = memo(({ className }: OrderContentProps) => {
  const { t } = useTranslation('cart')

  return (
    <div className={classNames(clsGeneral.card, {}, [className, cls.orderContent])}>
      <h3 className={classNames(clsGeneral.title, cls.title)}>{t('order content')}</h3>
      <Cart readonly items={cartList} className={cls.cart}/>
    </div>
  )
})

OrderContent.displayName = 'OrderContent'