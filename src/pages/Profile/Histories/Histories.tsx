import cls from './Histories.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { OrderHistory } from '@/widgets';

interface HistoriesProps {
  className?: string
}
export const Histories = ({ className }: HistoriesProps) => {
  const { t } = useTranslation('cart')

  return (
    <>
      <h4 className={cls.title}>{t('order history')}</h4>

      <div className={classNames(cls.histories, {}, [className])}>
        <OrderHistory />
        <OrderHistory />
        <OrderHistory />
      </div>
    </>
  )
}