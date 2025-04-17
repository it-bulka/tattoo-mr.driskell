import cls from './AdditionalCartInfo.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Input, DecoratedLink, Button, CheckBox, AppLink, RadioButton, InfoLabel } from '@/shared/ui'
import { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCartTotalsSelector } from '@/entities/Cart'

interface AdditionalInfoProps {
  className?: string
}

const payment = [
  {
    name: 'payment',
    value: 'online payment',
    label: 'payment.online payment.title',
    info: 'payment.online payment.info'
  },
  {
    name: 'payment',
    value: 'cash on delivery',
    label: 'payment.cash on delivery.title',
    info: 'payment.cash on delivery.info'
  },
  {
    name: 'payment',
    value: 'bank transfer',
    label: 'payment.bank transfer.title',
    info: 'payment.bank transfer.info',
  }
]

const delivery = [
  {
    name: 'delivery',
    value: 'courier service',
    label: 'delivery.courier service.title',
    info: 'delivery.courier service.info',
  },
  {
    name: 'delivery',
    value: 'nova poshta',
    label: 'delivery.nova poshta.title',
    info: 'delivery.nova poshta.info',
  }
]

export const AdditionalCartInfo = memo(({ className }: AdditionalInfoProps) => {
  const { t } = useTranslation('cart')
  const [paymentSelected, setPaymentSelected] = useState(payment[0])
  const [deliverySelected, setdeliverySelected] = useState(delivery[1])
  const totals = useSelector(getCartTotalsSelector)

  return (
    <div className={classNames(cls.additionalInfo, {}, [className])}>
      <div className={cls.block}>
        <div className={cls.prices}>
          <span>{t('summary.total items')}</span>
          <span>{totals.totalAmount}</span>
        </div>
        <div className={cls.prices}>
          <span>{t('summary.total discount')}</span>
          <span>{totals.totalDiscount}</span>
        </div>
        <div className={cls.prices}>
          <span>{t('summary.additional services')}</span>
          <span>{totals.totalServices}</span>
        </div>
        <div className={(cls.pricesTotal)}>
          <span>{t('summary.grand total')}</span>
          <span>{totals.totalPrice}</span>
        </div>

        <Input
          label={t('promo code')}
          inputClassName={cls.input}
          className={cls.inputWrapper}
        />
        <DecoratedLink to="/" className={cls.link}>{t('apply promo code')}</DecoratedLink>
        <div className="decorator full croppedPoligon gray"/>
      </div>

      <div className={cls.block}>
        <div className={cls.radioBtns}>
          <h3 className={cls.radioTitle}>{t('payment.title')}</h3>
          {payment.map(item => (
            <RadioButton
              value={item.value}
              selectedValue={paymentSelected.value}
              onChange={()=> setPaymentSelected(item)}
              label={(
                <InfoLabel
                  label={t(item.label)}
                  info={t(item.info)}
                />
              )}
              key={item.value}
              className={cls.radioBtn}
            />
          ))}
        </div>

        <div className={cls.radioBtns}>
          <h3 className={cls.radioTitle}>{t('delivery.title')}</h3>
          {delivery.map(item => (
            <RadioButton
              value={item.value}
              selectedValue={deliverySelected.value}
              onChange={()=> setdeliverySelected(item)}
              label={(
                <InfoLabel
                  label={t(item.label)}
                  info={t(item.info)}
                />
              )}
              key={item.value}
              className={cls.radioBtn}
            />
          ))}
        </div>

        <div className="decorator full croppedPoligon gray"/>
      </div>

      <div className={cls.block}>
        <Button dark center max big>{t('buy now')}</Button>
        <Button center max big className={cls.contact}>{t('contact the manager')}</Button>
        <CheckBox
          label={
            <span>
              {t('agreement.agree')}{' '}
              <AppLink to="/" className={cls.agreeLink}>{t('agreement.public offer')}</AppLink>{' '}
              {t('agreement.and')}{' '}
              <AppLink to="/" className={cls.agreeLink}>{t('agreement.personal data')}</AppLink>
            </span>
          }
          className={cls.checkBox}
        />
      </div>

    </div>
  )
})

AdditionalCartInfo.displayName = 'AdditionalInfo'