import cls from './AdditionalCartInfo.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Button, CheckBox, AppLink, RadioButton, InfoLabel } from '@/shared/ui'
import { memo, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getCartTotalsSelector, getTotalPriceSelector, getPromoCodeName } from '@/entities/Cart'
import {
  getOrderDeliverySelector,
  getOrderPaymentSelector,
  getSelectedServicesSelector,
  PaymentType,
  DeliveryType,
  orderActions
} from '@/entities/Order'
import { useGetServicesQuery } from '@/entities/Service'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { deliveryList, deliveries } from '../model/consts/deliveries.tsx'
import { payments, paymentList } from '../model/consts/payments.tsx'
import { type CartFormData } from '@/features/CartForm'
import { Controller, useFormContext } from 'react-hook-form'
import { ErrorMsg } from '@/shared/ui'
import { ActivatePromoButton } from '@/features/applyPromoCode'
import { CodConfirmModal } from './CodConfirmModal/CodConfirmModal.tsx'
import { useCheckoutSubmit } from '../model/hooks/useCheckoutSubmit.ts'

interface AdditionalInfoProps {
  className?: string
}

export const AdditionalCartInfo = memo(({ className }: AdditionalInfoProps) => {
  const { t } = useTranslation('cart')
  const selectedPaymentType = useSelector(getOrderPaymentSelector)
  const selectedDeliveryType = useSelector(getOrderDeliverySelector)
  const selectedServices = useSelector(getSelectedServicesSelector)
  const cartSubtotal = useSelector(getTotalPriceSelector)
  const totals = useSelector(getCartTotalsSelector)
  const promocodeName = useSelector(getPromoCodeName)

  const { data: servicesData } = useGetServicesQuery()

  const totalServices = useMemo(() => {
    if (!servicesData || !selectedServices.length) return 0
    return servicesData
      .filter(s => selectedServices.includes(s._id))
      .reduce((sum, s) => {
        if (s.type === 'fixed') return sum + s.value
        return sum + (cartSubtotal * s.value) / 100
      }, 0)
  }, [servicesData, selectedServices, cartSubtotal])

  const dispatch = useAppDispatch()

  const updatePayment = useCallback((payment: PaymentType) => {
    dispatch(orderActions.setPayment(payment))
  }, [dispatch])

  const updateDelivery = useCallback((delivery: DeliveryType) => {
    dispatch(orderActions.setDelivery(delivery))
  }, [dispatch])

  const { control } = useFormContext<CartFormData>()

  const {
    isCod,
    isCodModalOpen,
    closeCodModal,
    handleMainButtonClick,
    handleCodConfirm,
  } = useCheckoutSubmit()

  const buttonLabel = isCod ? t('payment.confirm order') : t('payment.pay now')

  return (
    <div className={classNames(cls.additionalInfo, {}, [className])}>
      <div className={cls.block}>
        <div className={cls.prices}>
          <span>{t('summary.total items')}</span>
          <span>{totals.totalAmount}</span>
        </div>
        <div className={cls.prices}>
          <span>{t('summary.total discount')}</span>
          <span>{`− ${totals.totalDiscount}`}</span>
        </div>
        {!!totals.bundleDiscount && (
          <div className={cls.prices}>
            <span>{t('summary.bundle discount')}</span>
            <span>{`− ${totals.bundleDiscount}`}</span>
          </div>
        )}
        {!!totals.promoDiscount && (
          <div className={cls.prices}>
            <span>{t('summary.promo discount')}{promocodeName ? ` ${promocodeName}` : ''}</span>
            <span>{`− ${totals.promoDiscount}`}</span>
          </div>
        )}
        <div className={cls.prices}>
          <span>{t('summary.additional services')}</span>
          <span>{totalServices}</span>
        </div>
        <div className={(cls.pricesTotal)}>
          <span>{t('summary.grand total')}</span>
          <span>{totals.totalPrice + totalServices}</span>
        </div>

        <ActivatePromoButton  className={cls.promoBtn}/>

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
        <Button dark center max big onClick={handleMainButtonClick}>{buttonLabel}</Button>
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

      <CodConfirmModal
        isOpen={isCodModalOpen}
        onClose={closeCodModal}
        onConfirm={handleCodConfirm}
      />
    </div>
  )
})

AdditionalCartInfo.displayName = 'AdditionalInfo'