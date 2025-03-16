import cls from './OrderInfo.module.scss'
import clsGeneral from '../OrderHistory.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { dateFormat, currencyFormat } from '@/shared/libs'
import { memo } from 'react'

interface OrderInfoProps {
  className?: string
  date: Date
  orderNumber: number | string
  address: string
  totalCost: number
  fullName: string
  phone: string
  email: string
}

interface InfoProps {
  title: string
  text: string
}

const Info = ({ title, text }: InfoProps) => {
  return (
    <div className={cls.info}>
      <p className={cls.infoTitle}>{title}</p>
      <p className={cls.infoText}>{text}</p>
    </div>
  )
}
export const OrderInfo = memo(({
  className,
  date,
  orderNumber,
  address,
  totalCost,
  fullName,
  phone,
  email,
}: OrderInfoProps) => {
  const { t } = useTranslation('cart')

  return (
    <div className={classNames(clsGeneral.card, {}, [cls.orderInfo, className])}>
      <h4 className={classNames(cls.title, clsGeneral.title)}>{t('order information')}</h4>
      <Info
        title={t('order number')}
        text={`${orderNumber} ${t('from')} ${dateFormat(date, 'all')}`}
      />
      <Info
        title={t('order number')}
        text={address}
      />
      <Info
        title={t('order cost')}
        text={currencyFormat(totalCost)}
      />

      <h4 className={classNames(cls.title, clsGeneral.title)}>{t('contact person')}</h4>
      <Info
        title={t('full name')}
        text={fullName}
      />
      <Info
        title={t('phone')}
        text={phone}
      />
      <Info
        title={t('email')}
        text={email}
      />

      <div className="decorator full croppedPoligon gray"/>
    </div>
  )
})

OrderInfo.displayName = 'OrderInfo'