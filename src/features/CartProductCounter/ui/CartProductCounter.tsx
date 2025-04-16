import { CounterInput, CounterInputProps } from '@/shared/ui'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { useSelector } from 'react-redux'
import { getCartItemById } from '@/entities/Cart'
import { useCallback } from 'react'
import { cartActions } from '@/entities/Cart/model/slice/cartSlice.tsx'
import { memo } from 'react'

interface CartProductCounter extends CounterInputProps {
  productId: string
}

export const CartProductCounter = memo(({ productId, ...rest }: CartProductCounter) => {
  const dispatch = useAppDispatch()
  const product = useSelector(getCartItemById(productId))

  const handleQuantity = useCallback((productId: string) => (quantity: number) => {
    dispatch(cartActions.setItemAmount({id: productId, quantity }))
  }, [dispatch])

  return <CounterInput
    initialValue={product.quantity}
    onChange={handleQuantity(productId)}
    className={rest.className}
  />
})

CartProductCounter.displayName = 'CartProductCounter'