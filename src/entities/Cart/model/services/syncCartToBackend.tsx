import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { cartApi } from '../api/cartApi.tsx'

export const syncCartToBackend = createAsyncThunk<
  void,
  void,
  { state: StateSchema }
>(
  'cart/syncToBackend',
  async (_, { getState }) => {
    const { cart: cartState, user } = getState()
    const items = Object.values(cartState.entities).map(item => ({
      product: item.productId,
      amount: item.quantity,
    }))

    cartApi.endpoints.syncCart.initiate({
      userId: user.id,
      orderItems: items
    })
  }
)
