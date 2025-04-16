import { Middleware, AnyAction } from '@reduxjs/toolkit'
import debounce from 'lodash.debounce'
import { cartApi } from '../api/cartApi'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { AppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { cartActions } from '@/entities/Cart/model/slice/cartSlice.tsx'

let getState: (() => StateSchema) | null = null
let dispatch: AppDispatch | null = null

const debouncedSync = debounce(async () => {
  if (!getState || !dispatch || !navigator.onLine) return

  const state = getState()
  const cart = state.cart

  const items = Object.values(cart.entities).map(item => ({
    product: item.productId,
    amount: item.quantity,
  }))

  try {
    const result = await dispatch(
      cartApi.endpoints.syncCart.initiate({
        userId: state.user.id,
        orderItems: items,
      })
    ).unwrap()

    dispatch(cartActions.setCartData(result?.data || []))
    dispatch(cartActions.setBackSync(true))
  } catch (error) {
    console.error('Cart sync error:', error)
  }
}, 2000)


const syncTriggerActions = [
  'cart/addItem',
  'cart/removeItem',
  'cart/setItemAmount'
]

export const cartSyncMiddleware: Middleware = store => {
  getState = store.getState
  dispatch = store.dispatch as AppDispatch

  return next => (action) => {
    const result = next(action)

    const typedAction = action as AnyAction
    if (syncTriggerActions.includes(typedAction.type)) {
      debouncedSync()
    }

    return result
  }
}
