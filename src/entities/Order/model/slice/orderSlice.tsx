import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderSchema, PaymentType, DeliveryType } from '../types/orderSchema.tsx'

const initialState: OrderSchema = {
  payment: 'online',
  delivery: 'novaPoshta',
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setPayment: (state, action: PayloadAction<PaymentType>) => {
      state.payment = action.payload
    },
    setDelivery: (state, action: PayloadAction<DeliveryType>) => {
      state.delivery = action.payload
    }
  }
})

export const {
  actions: orderActions,
  reducer: orderReducer
} = orderSlice