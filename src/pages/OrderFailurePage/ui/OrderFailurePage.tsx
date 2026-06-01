import cls from './OrderFailurePage.module.scss'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { AppLink } from '@/shared/ui'
import { getCartPage } from '@/shared/config/routeConfig/routeConfig.tsx'

const OrderFailurePage = () => {
  const { t } = useTranslation('cart')
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className={cls.page}>
      <div className={cls.content}>
        <div className={cls.icon}>✕</div>
        <h2 className={cls.title}>{t('order failure.title')}</h2>
        {orderId && (
          <p className={cls.orderId}>
            {t('order success.order number')} <span>{orderId}</span>
          </p>
        )}
        <p className={cls.description}>{t('order failure.description')}</p>
        <AppLink to={getCartPage()}>{t('order failure.back to cart')}</AppLink>
      </div>
    </div>
  )
}

export default OrderFailurePage
