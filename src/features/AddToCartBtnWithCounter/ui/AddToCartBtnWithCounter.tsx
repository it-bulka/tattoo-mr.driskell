import { useSelector } from 'react-redux'
import { getCartItemById } from '@/entities/Cart'
import { CartProductCounter } from '../../CartProductCounter/ui/CartProductCounter.tsx'
import { AddToCartBtn } from '../../AddToCartBtn/AddToCartBtn.tsx'
import { memo } from 'react'
import type { ButtonProps } from '@/shared/ui';

export interface AddToCartBtnWithCounterProps extends ButtonProps {
  productId: string
}

export const AddToCartBtnWithCounter = memo(({ productId, ...rest}: AddToCartBtnWithCounterProps) => {
  const product = useSelector(getCartItemById(productId))

  return product
    ? <CartProductCounter productId={productId} className={rest.className} />
    : <AddToCartBtn products={[productId]} {...rest}/>
})

AddToCartBtnWithCounter.displayName = 'AddToCartBtnWithCounter'