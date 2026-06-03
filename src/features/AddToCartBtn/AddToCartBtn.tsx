import { useTranslation } from 'react-i18next'
import { Button, type ButtonProps } from '@/shared/ui'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { useCallback, memo, MouseEvent } from 'react'
import { addItemsToCart } from '@/entities/Cart'
import { ProductWithAmount } from '@/entities/ProductCard/ProductCard.tsx'

export interface AddToCartBtnProps extends Omit<ButtonProps, 'onClick'> {
  product?: ProductWithAmount
  products?: ProductWithAmount[]
  onClick?: () => void
}

export const AddToCartBtn = memo(({ product, products, onClick, ...rest }: AddToCartBtnProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const handleAddToCart = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const items = products ?? (product ? [product] : [])
    if (items.length) dispatch(addItemsToCart(items))
    onClick?.()
  }, [dispatch, product, products, onClick])

  return <Button {...rest} onClick={handleAddToCart}>{t('add to cart')}</Button>
})

AddToCartBtn.displayName = 'AddToCartBtn'
