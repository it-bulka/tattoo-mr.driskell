import { WritableDraft } from 'immer'
import { CartDataRes, CartSchema } from '@/entities/Cart'
import { PayloadAction } from '@reduxjs/toolkit';

type SetPromoCodeData = (
  state: WritableDraft<CartSchema>,
  action: PayloadAction<CartDataRes>
) => void

export const setPromoCodeData: SetPromoCodeData = (state, action) => {
  const { promoCodeError, promocode } = action.payload
  if (promoCodeError) {
    state.error = promoCodeError.message
    state.promoCode = undefined
    return
  }

  if (promocode) {
    state.promoCode = promocode
    state.error = undefined
  }
}