import { DecoratedLink, Input } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { activatePromo, getPromoCodeName, cartActions, getCartTotalsSelector } from '@/entities/Cart'
import { useRef, memo } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { currencyFormat } from '@/shared/libs'
import cls from './ActivatePromoButton.module.scss'

interface ActivatePromoButtonProps {
  className?: string
}

export const ActivatePromoButton = memo(({ className }: ActivatePromoButtonProps) => {
  const { t } = useTranslation('cart')
  const inputRef = useRef<string | null>(null)
  const promocode = useSelector(getPromoCodeName)
  const { promoDiscount } = useSelector(getCartTotalsSelector)
  const dispatch = useAppDispatch()

  const handleActivatePromo = async () => {
    if (promocode) {
      toast.warning(t('promo code already active', { code: promocode }))
      return
    }
    const result = await dispatch(activatePromo(inputRef.current))
    if (activatePromo.rejected.match(result)) {
      toast.error(result.payload as string)
    } else if (activatePromo.fulfilled.match(result)) {
      if (result.payload.promoCodeError) {
        toast.error(result.payload.promoCodeError.message)
      } else {
        toast.success(t('promo code applied'))
      }
    }
  }

  const handleCancelPromo = () => {
    dispatch(cartActions.restartPromocode())
  }

  return (
    <div className={className}>
      <Input
        key={promocode ?? 'empty'}
        defaultValue={promocode}
        label={t('promo code')}
        inputClassName={cls.input}
        className={cls.inputWrapper}
        onChange={(e) => { inputRef.current = e.target.value }}
      />

      {promocode && promoDiscount > 0 && (
        <p className={cls.discount}>
          {t('promo code discount', { code: promocode })} {currencyFormat(promoDiscount)}
        </p>
      )}

      {promocode && (
        <DecoratedLink className={cls.cancelLink} type="button" onClick={handleCancelPromo}>
          {t('promo code cancel')}
        </DecoratedLink>
      )}

      <DecoratedLink className={cls.link} type="button" onClick={handleActivatePromo}>
        {t('promo code apply')}
      </DecoratedLink>
    </div>
  )
})

ActivatePromoButton.displayName = 'ActivatePromoButton'
