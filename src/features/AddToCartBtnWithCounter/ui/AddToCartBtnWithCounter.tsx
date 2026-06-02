import { useSelector } from 'react-redux'
import { getCartItemById } from '@/entities/Cart'
import { CartProductCounter } from '../../CartProductCounter/ui/CartProductCounter.tsx'
import { AddToCartBtn, AddToCartBtnProps } from '../../AddToCartBtn/AddToCartBtn.tsx'
import { ProductWithAmount } from '@/entities/ProductCard/ProductCard.tsx'
import { memo } from 'react'

export interface AddToCartBtnWithCounterProps extends Omit<AddToCartBtnProps, 'product'> {
  product: ProductWithAmount
}

export const AddToCartBtnWithCounter = memo(({ product, ...rest }: AddToCartBtnWithCounterProps) => {
  const cartItem = useSelector(getCartItemById(product.id))

  return cartItem
    ? <CartProductCounter productId={product.id} product={product} className={rest.className} />
    : <AddToCartBtn product={product} {...rest} />
})

AddToCartBtnWithCounter.displayName = 'AddToCartBtnWithCounter'
