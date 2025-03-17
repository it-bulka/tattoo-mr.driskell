import cls from './Histories.module.scss'
import { useTranslation } from 'react-i18next'
import { OrderHistory } from '@/widgets';

interface HistoriesProps {
  className?: string
}
export const Histories = ({ className }: HistoriesProps) => {
  const { t } = useTranslation('cart')

  return (
    <div className={className}>
      <h4 className={cls.title}>{t('order history')}</h4>

      <div className={cls.histories}>
        <OrderHistory />
        <OrderHistory />
        <OrderHistory />
      </div>
    </div>
  )
}