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
  cartAdapter.setAll(state, action.payload.items || [])
  state.totalAmount = action.payload.totalItems
  state.totalPrice = action.payload.totalToPay
  state.discount = action.payload.discount
  state.extraServices = action.payload.extraServices
}