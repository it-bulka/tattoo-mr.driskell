import { DecoratedLink, Input } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { activatePromo, getPromoCodeName, cartActions } from '@/entities/Cart'
import { useRef, memo } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import cls from './ActivatePromoButton.module.scss'

interface ActivatePromoButtonProps {
  className?: string
}

export const ActivatePromoButton = memo(({ className }: ActivatePromoButtonProps) => {
  const { t } = useTranslation('cart')
  const inputRef = useRef<string | null>(null)
  const promocode = useSelector(getPromoCodeName)
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
        readOnly={!!promocode}
        label={t('promo code')}
        inputClassName={cls.input}
        className={cls.inputWrapper}
        onChange={(e) => { inputRef.current = e.target.value }}
      />

      {!promocode && (
        <DecoratedLink className={cls.link} type="button" onClick={handleActivatePromo}>
          {t('promo code apply')}
        </DecoratedLink>
      )}

      {promocode && (
        <DecoratedLink className={cls.link} type="button" onClick={handleCancelPromo}>
          {t('promo code cancel')}
        </DecoratedLink>
      )}
    </div>
  )
})

ActivatePromoButton.displayName = 'ActivatePromoButton'
