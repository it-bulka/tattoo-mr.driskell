import cls from './OrderSuccessPage.module.scss'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { getProfilePage, getCartPage } from '@/shared/config/routeConfig/routeConfig.tsx'

const OrderSuccessPage = () => {
  const { t } = useTranslation('cart')
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className={cls.page}>
      <div className={cls.content}>
        <div className={cls.icon}>✓</div>
        <h2 className={cls.title}>{t('order success.title')}</h2>
        {orderId && (
          <p className={cls.orderId}>
            {t('order success.order number')} <span>{orderId}</span>
          </p>
        )}
        <p className={cls.description}>{t('order success.description')}</p>
        <div className={cls.links}>
          <AppLink to={getProfilePage()}>{t('order success.to profile')}</AppLink>
          <AppLink to={getCartPage()}>{t('order success.continue shopping')}</AppLink>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessPage
