import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { cartApi } from '../api/cartApi.tsx'
import { transformCartItemsForBack } from '@/entities/Cart'
import { getUserId } from '@/entities/User'

export const syncCartToBackend = createAsyncThunk<
  void,
  void,
  { state: StateSchema }
>(
  'cart/syncToBackend',
  async (_, { getState }) => {
    const state = getState()
    const userId = getUserId(state)
    if (!userId) return

    const items = transformCartItemsForBack(state.cart)

    cartApi.endpoints.syncCart.initiate({
      userId,
      orderItems: items
    })
  }
)
