import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { cartApi } from '../api/cartApi.tsx'
import { CartDataRes } from '../type/cartSchema.tsx'
import { getUserId } from '@/entities'
import { getCartItemsForBackSelector } from '../selectors/selectors.tsx'
import { ApiError } from '@/shared/type'

export const activatePromo = createAsyncThunk<
  CartDataRes,
  string | null,
  { state: StateSchema, rejectValue: string }
>(
  'cart/activatePromo',
  async (promoName, { rejectWithValue, dispatch, getState }) => {
    const state = getState()

    const promo = promoName?.trim().toUpperCase()
    if(!promo) return rejectWithValue('Provide promo name to activate')

    const items = getCartItemsForBackSelector(state)
    if(items.length === 0) return rejectWithValue('Please, choose products to buy before activate product')

    const userId = getUserId(state)
    if(!userId) return rejectWithValue('User id is missing')

    // TODO: add extraServices
    // const extraServices = undefined

    try {
      const response = await dispatch(
        cartApi.endpoints.activatePromo.initiate({ promoCode: promo, items, userId })
      ).unwrap()

      return response.data
    } catch (error) {
      let err = 'Something went wrong. Promo is not activated'

      if (error instanceof Error) {
        err = error.message
      } else if((error as ApiError).data) {
        const errorMsg = error as ApiError
        err = errorMsg.data?.message || errorMsg.data?.error || err
      }

      return rejectWithValue(err)
    }
  }
)