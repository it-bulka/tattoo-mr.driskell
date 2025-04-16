import { useSelector } from 'react-redux'
import { getCartItemById } from '@/entities/Cart'
import { CartProductCounter } from '../../CartProductCounter/ui/CartProductCounter.tsx'
import { AddToCartBtnProps, AddToCartBtn } from '../../AddToCartBtn/AddToCartBtn.tsx'
import { memo } from 'react'

export const AddToCartBtnWithCounter = memo(({productId, ...rest}: AddToCartBtnProps) => {
  const product = useSelector(getCartItemById(productId))

  return product
    ? <CartProductCounter productId={productId} className={rest.className} />
    : <AddToCartBtn productId={productId} {...rest}/>
})

AddToCartBtnWithCounter.displayName = 'AddToCartBtnWithCounter'