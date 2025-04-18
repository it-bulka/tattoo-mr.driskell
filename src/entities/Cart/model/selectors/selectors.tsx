import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { cart } from '../slice/cartSlice.tsx'
import { createSelector } from '@reduxjs/toolkit'

export const getCartSelector = (state: StateSchema) => state.cart

export const getCartItemsSelector = cart.selectAll

export const getTotalAmountSelector = (state: StateSchema) => state.cart.totalAmount || 0
export const getTotalPriceSelector = (state: StateSchema) => state.cart.totalPrice || 0

export const getCartTotalsSelector = createSelector(
  [getCartSelector],
  (cart) => ({
    totalPrice: cart.totalPrice || 0,
    totalAmount: cart.totalAmount || 0,
    totalDiscount: cart.discount || 0,
    totalServices: cart.extraServices || 0
  })
)

export const getCartLoadingSelector = (state: StateSchema) => state.cart.isLoading
export const getCartErrorSelector = (state: StateSchema) => state.cart.error
export const getCartSyncWithBackSelector = (state: StateSchema) => state.cart.isBackSynchronized
export const getCartItemById = (id: string) => (state: StateSchema) => cart.selectById(state, id)