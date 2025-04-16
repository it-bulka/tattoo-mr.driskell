import { useTranslation } from 'react-i18next'
import { Button, type ButtonProps} from '@/shared/ui'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { useCallback, memo, MouseEvent } from 'react'
import { addItemToCart } from '@/entities/Cart'

export interface AddToCartBtnProps extends ButtonProps {
  productId: string
}

export const AddToCartBtn = memo(({productId, ...rest}: AddToCartBtnProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const handleAddToCart = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    dispatch(addItemToCart(productId))
  }, [dispatch])

  return <Button {...rest} onClick={handleAddToCart}>{t('add to cart')}</Button>
})

AddToCartBtn.displayName = 'AddToCartBtn'


