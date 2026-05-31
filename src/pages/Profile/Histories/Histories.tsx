import cls from './Histories.module.scss'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { OrderHistory } from '@/widgets'
import { getUserId } from '@/entities/User'
import { useGetUserOrdersQuery } from '@/entities/Order'

interface HistoriesProps {
  className?: string
}

export const Histories = ({ className }: HistoriesProps) => {
  const { t } = useTranslation('cart')
  const userId = useSelector(getUserId)
  const { data: orders = [], isLoading } = useGetUserOrdersQuery(userId!, { skip: !userId })

  return (
    <div className={className}>
      <h4 className={cls.title}>{t('order history')}</h4>

      <div className={cls.histories}>
        {isLoading && <p>...</p>}
        {!isLoading && orders.length === 0 && (
          <p>{t('no orders')}</p>
        )}
        {orders.map(order => (
          <OrderHistory key={order.orderNumber} {...order} />
        ))}
      </div>
    </div>
  )
}
