import cls from './OrderHistoryItem.module.scss'
import clsGeneral from '../OrderHistory.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { memo, PropsWithChildren } from 'react'
import ArrowLeft from '@/shared/assets/general/arrow-left.svg?react'
import { currencyFormat, dateFormat } from '@/shared/libs'

// equal to translation
type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'payment error' | 'delayed' | 'ready for pickup'

interface OrderHistoryItemProps {
  className?: string
  date: Date,
  orderNumber: number | string,
  quantity: number | string,
  totalCost: number,
  status: OrderStatus
  onBtnClick?: () => void
  isUp?: boolean
}

type OrderHistoryItemContentProps = Omit<OrderHistoryItemProps, 'onBtnClick' | 'isUp'>

// Separate, to prevent rerender on changing styles by "isUp"
const OrderHistoryItemContent = memo(({
  children,
  className,
  date,
  orderNumber,
  quantity,
  totalCost,
  status,
}: PropsWithChildren<OrderHistoryItemContentProps>) => {
  const { t } = useTranslation()
  return (
    <div className={classNames(clsGeneral.card, {}, [className, cls.gridTable])}>
      <p className={cls.gridHeader}>{t('date')}</p>
      <p className={cls.gridHeader}>{t('order number')}</p>
      <p className={cls.gridHeader}>{t('quantity of items')}</p>
      <p className={cls.gridHeader}>{t('total amount')}</p>
      <p className={cls.gridHeader}>{t('status')}</p>

      {children}

      <p className={cls.gridCell}>{dateFormat(date)}</p>
      <p className={cls.gridCell}>{orderNumber}</p>
      <p className={cls.gridCell}>{quantity}</p>
      <p className={cls.gridCell}>{currencyFormat(totalCost)}</p>
      <p className={cls.gridCell}>{t(`order-status.${status}`)}</p>
    </div>
  )
})

export const OrderHistoryItem = memo(({
  onBtnClick,
  isUp = false,
  ...props
}: OrderHistoryItemProps) => {
  return (
    <OrderHistoryItemContent {...props}>
      <button onClick={onBtnClick} className={classNames(cls.arrow, { [cls.up]:  isUp})}>
        <ArrowLeft />
      </button>
    </OrderHistoryItemContent>
  )
})

OrderHistoryItem.displayName = 'OrderHistoryItem'
OrderHistoryItemContent.displayName = 'OrderHistoryItemContent'