import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'

export const getTotalAmountSelector = (state: StateSchema) => state.cart.totalAmount || 0
export const getTotalPriceSelector = (state: StateSchema) => state.cart.totalPrice || 0
export const getCartItemsSelector = (state: StateSchema) => state.cart.data
export const getCartLoadingSelector = (state: StateSchema) => state.cart.isLoading
export const getCartErrorSelector = (state: StateSchema) => state.cart.error