import { CounterInput, CounterInputProps } from '@/shared/ui'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { useSelector } from 'react-redux'
import { getCartItemById } from '@/entities/Cart'
import { useCallback, memo } from 'react'
import { cartActions } from '@/entities/Cart/model/slice/cartSlice.tsx'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'

interface CartProductCounterProps extends CounterInputProps {
  productId: string
  product?: Product
}

export const CartProductCounter = memo(({ productId, product, ...rest }: CartProductCounterProps) => {
  const dispatch = useAppDispatch()
  const cartItem = useSelector(getCartItemById(productId))

  const handleQuantity = useCallback((quantity: number) => {
    dispatch(cartActions.setItemAmount({
      id: productId,
      quantity,
      snapshot: product
        ? {
            price: product.priceCurrent ?? product.price,
            originalPrice: product.price,
            title: product.title,
            image: product.images[0],
          }
        : undefined,
    }))
  }, [dispatch, productId, product])

  return (
    <CounterInput
      initialValue={cartItem?.quantity}
      onChange={handleQuantity}
      className={rest.className}
    />
  )
})

CartProductCounter.displayName = 'CartProductCounter'
