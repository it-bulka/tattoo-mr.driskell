import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'

export const getLikedTotalCountSelector = (state: StateSchema) => state.favourites.products.totalCount
export const getLikedTotalPagesSelector = (state: StateSchema) => state.favourites.products.totalPages
export const getLikedCurrentPageSelector = (state: StateSchema) => state.favourites.products.currentPage
export const getItemsPerPageSelector = (state: StateSchema) => state.favourites.products.itemsPerPage
export const getLikedActualAmountSelector = (state: StateSchema) => state.favourites.products.ids.length
