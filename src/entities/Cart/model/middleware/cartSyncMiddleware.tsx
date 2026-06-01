import { Middleware, AnyAction } from '@reduxjs/toolkit'
import debounce from 'lodash.debounce'
import { cartApi } from '../api/cartApi'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { AppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { cartActions } from '../slice/cartSlice.tsx'
import { transformCartItemsForBack, getCartItemsSelector } from '../selectors/selectors.tsx'
import { getUserId } from '@/entities/User'
import { guestCartStorage } from '../utils/guestCartStorage.tsx'

let getState: (() => StateSchema) | null = null
let dispatch: AppDispatch | null = null

const debouncedSync = debounce(async () => {
  if (!getState || !dispatch) return

  const state = getState()
  const userId = getUserId(state)

  if (!userId) {
    guestCartStorage.set(getCartItemsSelector(state))
    return
  }

  if (!navigator.onLine) return

  const items = transformCartItemsForBack(state.cart)

  try {
    const result = await dispatch(
      cartApi.endpoints.syncCart.initiate({
        userId,
        orderItems: items,
        promoCode: state.cart.promoCode?.code,
      })
    ).unwrap()

    dispatch(cartActions.setCartData(result?.data || []))
    dispatch(cartActions.setBackSync(true))
  } catch (error) {
    console.error('Cart sync error:', error)
  }
}, 2000)


const syncTriggerActions = [
  'cart/addItems',
  'cart/removeItem',
  'cart/setItemAmount',
  'cart/restartPromocode'
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
