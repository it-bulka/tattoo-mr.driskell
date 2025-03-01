import { createSlice } from '@reduxjs/toolkit'
import { CartSchema } from '../type/cartSchema.tsx'

const initialState: CartSchema = {
  isLoading: false,
  error: '',
  data: [],
  totalAmount: 17,
  totalPrice: 37856
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: initialState,
  reducers: {

  }
})


export const {
  reducer: cartReducer,
  actions: cartActions
} = cartSlice
