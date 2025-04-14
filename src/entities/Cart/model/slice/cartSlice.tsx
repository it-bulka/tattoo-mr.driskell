import { createSlice } from '@reduxjs/toolkit'
import { CartSchema } from '../type/cartSchema.tsx'
import { fetchCart } from '../services/fetchCart.tsx'
import { CartItemType, CartData } from '../type/cartSchema.tsx'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { PayloadAction, createEntityAdapter } from '@reduxjs/toolkit'
import { setCartData } from '../utils/setCartData.tsx'
import {
  updateCartTotals,
  decreaseTotals,
  increaseTotals,
  RecalculateTotalsProps,
  ReturnTotals
} from '../utils/updateCartTotals.tsx'

const cartAdapter = createEntityAdapter<CartItemType, string>({
  selectId: (item) => item.productId
})

export const cart = cartAdapter.getSelectors<StateSchema>(
  state => state.cart
)

const initialState: CartSchema = cartAdapter.getInitialState({
  isLoading: false,
  error: '',
  totalAmount: 0,
  totalPrice: 0,
  discount: 0,
  extraServices: 0,
  ids: [],
  entities: {},
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<string>) => {
      if (!state.totalAmount) return

      const previous = state.entities[action.payload]
      const { productId, quantity, price, originalPrice } = previous

      cartAdapter.removeOne(state, productId)

      const newTotals = decreaseTotals({
        totalAmount: state.totalAmount,
        totalPrice: state?.totalPrice || 0,
        quantity,
        price,
        originalPrice,
        discount: state.discount  || 0,
      })

      updateCartTotals(state, newTotals)

    },
    setItemAmount: (state, action: PayloadAction<{id: string, quantity: number}>) => {
      const { id, quantity } = action.payload
      if(quantity < 1) {
        state.error = 'Add 1 or more quantity of product'
        return
      }

      const previous = state.entities[action.payload.id]
      if (!previous) {
        state.error = 'No such product found'
        return
      }

      if(previous.quantity === quantity) return

      const prevData: RecalculateTotalsProps = {
        totalAmount: state.totalAmount || 0,
        totalPrice: state.totalPrice || 0,
        discount: state.discount || 0,
        price: previous.price,
        originalPrice: previous.originalPrice,
        quantity
      }
      let updatedTotals: ReturnTotals | null = null

      if (previous.quantity > quantity) {
        updatedTotals = increaseTotals(prevData)
      } else {
        updatedTotals = decreaseTotals(prevData)
      }

      if(!updatedTotals) return
      updateCartTotals(state, updatedTotals)

      cartAdapter.updateOne(state, {
        id,
        changes: {
          quantity,
          total: previous.price * quantity
        }
      })
    },
    setCartData: (state, action: PayloadAction<CartData>) => {
      setCartData(state, action, cartAdapter)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartData>) => {
        state.isLoading = false
        setCartData(state, action, cartAdapter)
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})


export const {
  reducer: cartReducer,
  actions: cartActions
} = cartSlice
