import { Product } from '@/entities/ProductCard/ProductCard.tsx'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductsSchema, ProductCategory } from '../type/productSchema.ts'


const initialState: ProductsSchema = {}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<{ key: string; products: Product[], replace?: boolean}>) => {
      const { key, products, replace = false } = action.payload
      if (!state[key]) {
        state[key] = { products: [], currentPage: 1, totalPages: 1 }
      }
      state[key].products = replace ? products : [...state[key].products, ...products]
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