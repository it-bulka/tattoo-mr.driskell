import { Product } from '@/entities/ProductCard/ProductCard.tsx'
import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit'
import { ProductsSchema, ProductCategory } from '../type/productSchema.ts'
import { PRODUCT_PAGES } from '@/entities/ProductList/model/const/productPages.tsx'


export const productsAdapter = createEntityAdapter<Product, string>({
  selectId: (product) => product.id
})

const initialPages = {
  currentPage: 1,
  totalPages: 1,
}
const initialState: ProductsSchema = {
  [PRODUCT_PAGES.HOME]: productsAdapter.getInitialState(initialPages),
  // controlled, for easing selecting item
  allProducts: productsAdapter.getInitialState(initialPages)
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<{ key: string; products: Product[], replace?: boolean}>) => {
      const { key, products, replace = false } = action.payload

      if(replace) {
        productsAdapter.setAll(state[key], products)
      } else {
        productsAdapter.addMany(state[key], products)
      }

      productsAdapter.upsertMany(state.allProducts, products)
    },
    setPage(state, action: PayloadAction<{ key: string; page: number }>) {
      const { key, page } = action.payload
      if (state[key]) {
        state[key].currentPage = page
      }
    },
    setTotalPages(state, action: PayloadAction<{ key: string; totalPages: number }>) {
      const { key, totalPages } = action.payload
      if (state[key]) {
        state[key].totalPages = totalPages
      }
    },
    setCategory(state, action: PayloadAction<{ key: string; category: ProductCategory }>) {
      const { key, category } = action.payload
      if (state[key]) {
        state[key].category = category
      }
    },
    resetProducts(state, action: PayloadAction<string>) {
      delete state[action.payload]
    }
  }
})

export const {
  actions: productsActions,
  reducer: productsReducer,
} = productsSlice