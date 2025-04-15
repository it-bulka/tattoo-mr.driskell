import { createAsyncThunk } from '@reduxjs/toolkit'
import { cartApi } from '../api/cartApi.tsx'
import type { CartDataRes } from '../type/cartSchema.tsx'
import { RootState } from '@/app/providers/StoreProvider'
import { getUserId } from '@/entities'

export const fetchCart = createAsyncThunk<CartDataRes>(
  'cart/fetchCart',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = await getState() as unknown as RootState
      const userId = getUserId(state)
      const response = await dispatch(
        cartApi.endpoints.getCart.initiate({ userId })
      ).unwrap()

      console.log('SEE: fetchCart', response)

      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)