import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderSchema, PaymentType, DeliveryType, OrderRes } from '../types/orderSchema.tsx'
import { makeOrder } from '../service/makeOrder.tsx'

const initialState: OrderSchema = {
  payment: 'online',
  delivery: 'novaPoshta',
  loading: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(makeOrder.fulfilled, (state, action: PayloadAction<OrderRes>) => {
        state.loading = false
        state.error = undefined
        state.status = action.payload.status
        state.id = action.payload.orderId
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Something went wrong'
      })
  }
})

export const {
  actions: orderActions,
  reducer: orderReducer
} = orderSlice