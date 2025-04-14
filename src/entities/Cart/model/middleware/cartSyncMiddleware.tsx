import { Middleware, AnyAction } from '@reduxjs/toolkit'
import debounce from 'lodash.debounce'
import { cartApi } from '../api/cartApi'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { AppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { cartActions } from '@/entities/Cart/model/slice/cartSlice.tsx'

export const cartSyncMiddleware: Middleware = store => {
  const debouncedSync = debounce(async () => {
    const state = store.getState() as StateSchema
    const cart = state.cart
    const items = Object.values(cart.entities).map(item => ({
      product: item.productId,
      amount: item.quantity,
    }))

    const dispatch = store.dispatch as AppDispatch
    try {
      const result = await dispatch(
        cartApi.endpoints.syncCart.initiate({
          userId: state.user.id,
          orderItems: items,
        })
      ).unwrap();

      dispatch(cartActions.setCartData(result?.data || []))
    } catch (error) {
      console.error('Cart sync error:', error)
    }
  }, 1000)

  return next => (action) => {
    const result = next(action)

    const typedAction = action as AnyAction
    if (typedAction.type.startsWith('cart/') && !typedAction.type.startsWith('cart/fetchCart')) {
      debouncedSync()
    }

    return result
  }
}
