import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProductsByKey } from '../../../ProductList/model/selector/getProductsSelector.ts'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { CartItemType } from '../type/cartSchema.tsx'
import { cartActions } from '@/entities/Cart/model/slice/cartSlice.tsx'

export const addItemToCart = createAsyncThunk<
  void,
  string,
  { state: StateSchema }
>(
  'cartItem/addItemToCart',
  async (productId, { getState, rejectWithValue, dispatch }) => {
    if(!productId) {
      rejectWithValue('No product id found')
      return
    }

    const state = getState()
    const product = getProductsByKey(productId)(state)

    if(!product) {
      rejectWithValue('No product is found')
      return
    }

    const currentPrice = product.priceCurrent || product.price

    const cartItem: CartItemType = {
      productId: product.id,
      quantity: 1,
      price: currentPrice,
      originalPrice: product.price,
      total: currentPrice,
      title: product.title,
      image: product.images[0]
    }

    dispatch(cartActions.addItem(cartItem))
  }
)