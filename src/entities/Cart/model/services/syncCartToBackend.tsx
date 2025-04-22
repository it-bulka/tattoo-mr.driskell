import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { cartApi } from '../api/cartApi.tsx'
import { transformCartItemsForBack } from '@/entities/Cart'

export const syncCartToBackend = createAsyncThunk<
  void,
  void,
  { state: StateSchema }
>(
  'cart/syncToBackend',
  async (_, { getState }) => {
    const { cart: cartState, user } = getState()
    const items = transformCartItemsForBack(cartState)

    cartApi.endpoints.syncCart.initiate({
      userId: user.id,
      orderItems: items
    })
  }
)
