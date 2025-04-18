import cls from './AdditionalCartInfo.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Input, DecoratedLink, Button, CheckBox, AppLink, RadioButton, InfoLabel } from '@/shared/ui'
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getCartTotalsSelector } from '@/entities/Cart'
import {
  getOrderDeliverySelector,
  getOrderPaymentSelector,
  PaymentType,
  DeliveryType,
  orderActions
} from '@/entities/Order'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { deliveryList, deliveries } from '../model/consts/deliveries.tsx'
import { payments, paymentList } from '../model/consts/payments.tsx'
import { useSubmit, type CartFormData } from '@/features/CartForm'

import { Controller, useFormContext } from 'react-hook-form'
import { ErrorMsg } from '@/shared/ui'

interface AdditionalInfoProps {
  className?: string
}

export const AdditionalCartInfo = memo(({ className }: AdditionalInfoProps) => {
  const { t } = useTranslation('cart')
  const selectedPaymentType = useSelector(getOrderPaymentSelector)
  const selectedDeliveryType = useSelector(getOrderDeliverySelector)

  const totals = useSelector(getCartTotalsSelector)

  const dispatch = useAppDispatch()

  const updatePayment = useCallback((payment: PaymentType) => {
    dispatch(orderActions.setPayment(payment))
  }, [dispatch])

  const updateDelivery = useCallback((delivery: DeliveryType) => {
    dispatch(orderActions.setDelivery(delivery))
  }, [dispatch])

  const { control } = useFormContext<CartFormData>()
  const submitHandler = useSubmit()

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
          {paymentList.map(item => (
            <RadioButton
              value={item.value}
              selectedValue={payments[selectedPaymentType || 'online'].value}
              onChange={() => updatePayment(item.value)}
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
          {deliveryList.map(item => (
            <RadioButton
              value={item.value}
              selectedValue={deliveries[selectedDeliveryType || 'novaPoshta'].value}
              onChange={()=> updateDelivery(item.value)}
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
        <Button dark center max big onClick={submitHandler}>{t('buy now')}</Button>
        <Button center max big className={cls.contact}>{t('contact the manager')}</Button>

        <Controller
          name="agree"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <CheckBox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
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
              <ErrorMsg text={fieldState.error?.message} />
            </>
          )}
            />
      </div>

    </div>
  )
})

AdditionalCartInfo.displayName = 'AdditionalInfo'