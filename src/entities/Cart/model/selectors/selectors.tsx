import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { cart } from '../slice/cartSlice.tsx'

export const getCartItemsSelector = cart.selectAll

export const getTotalAmountSelector = (state: StateSchema) => state.cart.totalAmount || 0
export const getTotalPriceSelector = (state: StateSchema) => state.cart.totalPrice || 0
export const getCartLoadingSelector = (state: StateSchema) => state.cart.isLoading
export const getCartErrorSelector = (state: StateSchema) => state.cart.error
export const getCartSyncWithBackSelector = (state: StateSchema) => state.cart.isBackSynchronized