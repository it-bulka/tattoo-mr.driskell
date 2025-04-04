import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { createSelector } from '@reduxjs/toolkit'

const getProducts = (state: StateSchema)=> state.products
export const getProductsByKey = (listKey: string) => createSelector(
  [getProducts],
  (products) => products[listKey] || { products: [], currentPage: 1, totalPages: 1 }
)