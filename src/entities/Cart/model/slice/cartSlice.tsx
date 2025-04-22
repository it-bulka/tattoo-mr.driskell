import { createSlice } from '@reduxjs/toolkit'
import { CartSchema } from '../type/cartSchema.tsx'
import { fetchCart } from '../services/fetchCart.tsx'
import { CartItemType, CartDataRes } from '../type/cartSchema.tsx'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { PayloadAction, createEntityAdapter } from '@reduxjs/toolkit'
import { setCartData } from '../utils/setCartData.tsx'
import { recalculateTotalsWithSingleItem } from '../utils/recalculateTotalsWithSingleItem.tsx'
import { activatePromo } from '../services/activatePromo.tsx'
import { recalculatePromoCodeDiscount } from '../utils/recalculatePromoCodeDiscount.tsx'
import { setPromoCodeData } from '../utils/setPromoCodeData.tsx'

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
    addItems: (state, action: PayloadAction<CartItemType[]>) => {
      const items = action.payload

      const delta = {
        totalAmount: state.totalAmount || 0,
        totalDiscount: state.discount || 0,
        totalPrice: state.totalPrice || 0,
      }

      const mergedItems = items.map(item => {
        const existing = state.entities[item.productId]
        if (existing) {
          recalculateTotalsWithSingleItem(delta, existing)

          return {
            ...item,
            quantity: existing.quantity + item.quantity,
            total: existing.total + item.total,
          }
        }

        recalculateTotalsWithSingleItem(delta, item)
        return item
      })

      if(state.promoCode) {
        const promoDiscount = recalculatePromoCodeDiscount(delta.totalAmount, state.promoCode)
        delta.totalPrice -= promoDiscount
        delta.totalDiscount += promoDiscount
      }

      updateCartTotals(state, {
        newTotalAmount: delta.totalAmount,
        newDiscount: delta.totalDiscount,
        newTotalPrice: delta.totalPrice,
      })

      cartAdapter.upsertMany(state, mergedItems)

      state.isBackSynchronized = false
    },
    removeItem: (state, action: PayloadAction<string>) => {
      if (!state.totalAmount) return

      const previous = state.entities[action.payload]
      const { productId, quantity, price, originalPrice } = previous

      cartAdapter.removeOne(state, productId)

      const newTotals = decreaseTotals({
        totalAmount: state.totalAmount,
        totalPrice: state.totalPrice || 0,
        quantityDifference: Math.abs(previous.quantity - quantity),
        price,
        originalPrice,
        discount: state.discount  || 0,
      })

      if(state.promoCode) {
        const promoDiscount = recalculatePromoCodeDiscount(newTotals.newTotalPrice, state.promoCode)
        newTotals.newTotalPrice -= promoDiscount
        newTotals.newDiscount += promoDiscount
      }

      updateCartTotals(state, newTotals)
      state.isBackSynchronized = false
    },
    setItemAmount: (state, action: PayloadAction<{id: string, quantity: number}>) => {
      const { id, quantity } = action.payload

      if(quantity < 0) {
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
        quantityDifference: Math.abs(previous.quantity - quantity)
      }
      let updatedTotals: ReturnTotals | null = null

      if (previous.quantity < quantity) {
        updatedTotals = increaseTotals(prevData)
      } else {
        updatedTotals = decreaseTotals(prevData)
      }

      if(!updatedTotals) return

      if(state.promoCode) {
        const promoDiscount = recalculatePromoCodeDiscount(updatedTotals.newTotalAmount, state.promoCode)
        updatedTotals.newTotalPrice -= promoDiscount
        updatedTotals.newDiscount += promoDiscount
      }

      updateCartTotals(state, updatedTotals)

      if(quantity === 0) {
        cartAdapter.removeOne(state, id)
        return
      } else {
        cartAdapter.updateOne(state, {
          id,
          changes: {
            quantity,
            total: previous.price * quantity
          }
        })
      }
      state.isBackSynchronized = false
    },
    restartPromocode: (state) => {
      state.promoCode = undefined
      const items = Object.values(state.entities)

      const delta = {
        totalAmount: state.totalAmount || 0,
        totalDiscount: state.discount || 0,
        totalPrice: state.totalPrice || 0,
      }

      items.forEach(item => {
        recalculateTotalsWithSingleItem(delta, item)
        return item
      })

      updateCartTotals(state, {
        newTotalAmount: delta.totalAmount,
        newDiscount: delta.totalDiscount,
        newTotalPrice: delta.totalPrice,
      })
    },
    // BACK SYNC
    setCartData: (state, action: PayloadAction<CartDataRes>) => {
      setCartData(state, action, cartAdapter)
    },
    setBackSync: (state, action: PayloadAction<boolean>) => {
      state.isBackSynchronized = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartDataRes>) => {
        state.isLoading = false
        setCartData(state, action, cartAdapter)
        setPromoCodeData(state, action)
        state.isBackSynchronized = true
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(activatePromo.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(activatePromo.fulfilled, (state, action) => {
        state.isLoading = false
        setCartData(state, action, cartAdapter)
        setPromoCodeData(state, action)
        state.isBackSynchronized = true
      })
      .addCase(activatePromo.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const {
  reducer: cartReducer,
  actions: cartActions
} = cartSlice
