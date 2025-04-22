import { DecoratedLink, Input } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { activatePromo, getPromoCodeName, cartActions } from '@/entities/Cart'
import { useRef } from 'react'
import cls from './ActivatePromoButton.module.scss'
import { memo } from 'react'
import { useSelector } from 'react-redux'


interface ActivatePromoButtonProps {
  className?: string
}

export const ActivatePromoButton = memo(({ className }: ActivatePromoButtonProps) => {
  const { t } = useTranslation('cart')
  const inputRef = useRef<string | null>(null)
  const promocode = useSelector(getPromoCodeName)

  const dispatch = useAppDispatch()

  const handleActivatePromo = (inputValue: string | null) => {
    dispatch(activatePromo(inputValue))
  }

  const handleRestartPromo = () => {
    dispatch(cartActions.restartPromocode())
  }

  return (
    <div className={className}>
      <Input
        defaultValue={promocode}
        label={t('promo code')}
        inputClassName={cls.input}
        className={cls.inputWrapper}
        onChange={(e) => {
          if(promocode) return
          inputRef.current = e.target.value
        }}
      />

      {promocode ? <p>{t('promo code applied')}</p> : null}

      <DecoratedLink
        className={cls.link}
        type={'button'}
        onClick={() => promocode ? handleRestartPromo() : handleActivatePromo(inputRef?.current)}
      >
        {promocode ? t('promo code restart') : t('promo code apply')}
      </DecoratedLink>
    </div>
  )
})

ActivatePromoButton.displayName = 'ActivatePromoButton'