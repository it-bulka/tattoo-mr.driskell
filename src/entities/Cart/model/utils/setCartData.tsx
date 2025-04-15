import { WritableDraft } from 'immer'
import { PayloadAction } from '@reduxjs/toolkit'
import { CartDataRes, CartItemType, CartSchema } from '@/entities/Cart'
import { EntityAdapter } from '@reduxjs/toolkit'

type SetCartData = (
  state: WritableDraft<CartSchema>,
  action: PayloadAction<CartDataRes>,
  cartAdapter: EntityAdapter<CartItemType, string>
) => void

export const setCartData: SetCartData = (state, action, cartAdapter) => {
  cartAdapter.setAll(state, action.payload?.items || [])
  state.totalAmount = action.payload?.totalItems || 0
  state.totalPrice = action.payload?.totalToPay || 0
  state.discount = action.payload?.discount || 0
  state.extraServices = action.payload?.extraServices || 0
}