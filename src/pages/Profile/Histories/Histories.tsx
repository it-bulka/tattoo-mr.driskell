import cls from './Histories.module.scss'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { OrderHistory } from '@/widgets'
import { getUserId } from '@/entities/User'
import { useGetUserOrdersPaginatedQuery } from '@/entities/Order'
import { Button } from '@/shared/ui'
import { useState, useCallback } from 'react'
import classNames from 'classnames'

const LIMIT = 10

interface HistoriesProps {
  className?: string
}

export const Histories = ({ className }: HistoriesProps) => {
  const { t } = useTranslation('cart')
  const { t: tCommon } = useTranslation()
  const userId = useSelector(getUserId)
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching } = useGetUserOrdersPaginatedQuery(
    { userId: userId!, page, limit: LIMIT },
    { skip: !userId }
  )

  const orders = data?.orders ?? []
  const showLoadMore = data?.hasMore ?? false

  const handleLoadMore = useCallback(() => {
    if (data?.hasMore) {
      setPage(p => p + 1)
    }
  }, [data?.hasMore])

  return (
    <div className={className}>
      <h4 className={cls.title}>{t('order history')}</h4>

      <div className={classNames(cls.histories)}>
        {isLoading && <p>...</p>}
        {!isLoading && orders.length === 0 && (
          <p>{t('no orders')}</p>
        )}
        {orders.map(order => (
          <OrderHistory key={order.orderNumber} {...order} />
        ))}
      </div>

      {showLoadMore && (
        <Button
          big
          center
          className={cls.btn}
          disabled={isFetching}
          onClick={handleLoadMore}
        >
          {isFetching ? tCommon('loading') : tCommon('see more')}
        </Button>
      )}
    </div>
  )
}
