import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { createSelector } from '@reduxjs/toolkit'

export const getLikedInitedSelector = (state: StateSchema) => state.favourites.products._inited
export const getLikedTotalCountSelector = (state: StateSchema) => state.favourites.products.totalCount
export const getLikedTotalPagesSelector = (state: StateSchema) => state.favourites.products.totalPages
export const getLikedCurrentPageSelector = (state: StateSchema) => state.favourites.products.currentPage
export const getItemsPerPageSelector = (state: StateSchema) => state.favourites.products.itemsPerPage
export const getLikedActualAmountSelector = (state: StateSchema) => state.favourites.products.ids.length
export const getLikedIsLoadingSelector = (state: StateSchema) => state.favourites.products.isLoading
export const getLikedErrorSelector = (state: StateSchema) => state.favourites.products.error
export const canLoadMoreLikedSelector = createSelector(
  [getLikedTotalCountSelector, getLikedActualAmountSelector],
  (totalAmount, actualLoadedAmount) => totalAmount ===actualLoadedAmount
)
