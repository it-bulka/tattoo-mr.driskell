import { AppThunk } from '@/app/providers/StoreProvider/config/store.ts'
import { cartApi } from '@/entities/Cart/model/api/cartApi.tsx'
import { cartActions } from '@/entities/Cart/model/slice/cartSlice.tsx'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { useCallback } from 'react'
import { IS_BACK_CART_SYNC_LOCALSTORAGE } from '@/shared/consts'

export const manualSync = (): AppThunk => async (dispatch, getState) => {
  if(!navigator.onLine) return
  if (!localStorage.getItem(IS_BACK_CART_SYNC_LOCALSTORAGE)) return

  const state = getState()
  const cart = state.cart

  if(!cart || cart.isBackSynchronized) return

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
    localStorage.removeItem(IS_BACK_CART_SYNC_LOCALSTORAGE)
  } catch (e) {
    console.error('manualSync failed')
  }
}

export const useManualCartSync = () => {
  const dispatch = useAppDispatch()

  return useCallback(() => {
    manualSync()
  }, [dispatch])
}
