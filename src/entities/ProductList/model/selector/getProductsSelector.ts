import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { createSelector } from '@reduxjs/toolkit'
import { productsAdapter } from '@/entities/ProductList/model/slice/productsSlice.ts'

const getProducts = (state: StateSchema)=> state.products
export const getAllProducts = (listKey: string) => createSelector(
  [getProducts],
  (products) => {
    const subState = products[listKey]

    if(subState) {
      const { selectAll } = productsAdapter.getSelectors()
      return {
        ...subState,
        products: selectAll(subState)
      }
    }

    return  {
      products: [],
      currentPage: 1,
      totalPages: 1,
      category: undefined
    }
  }
)

export const getProductsByKey = (productId: string) => createSelector(
  [getProducts],
  (products) => {
    const subState = products.allProducts

    if(subState) {
      const { selectById } = productsAdapter.getSelectors()
      return selectById(subState, productId)
    }

    return undefined
  }
)