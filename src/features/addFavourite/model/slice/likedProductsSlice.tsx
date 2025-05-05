import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit'
import { LikedProductsSchema } from '../types/likedProducts.tsx'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'

const likedProductsAdapter = createEntityAdapter<Product, string>({
  selectId: product => product.id,
})

export const likedProductsSelector = likedProductsAdapter.getSelectors<StateSchema>(
  state => state.favourites.products
)

type Pages = {
  totalCount: number
  totalPages: number
  currentPage: number
}

const initialState: LikedProductsSchema = likedProductsAdapter.getInitialState({
  entities: {},
  ids: [],
  totalCount: 0,
  totalPages: 1,
  currentPage: 0,
  itemsPerPage: 10,

  error: null,
  isLoading: false,
  _inited: false,
})

const sliceLikedProducts = createSlice({
  name: 'liked/products',
  initialState,
  reducers: {
    initProducts: (state, action: PayloadAction<Product[]>) => {
      likedProductsAdapter.setMany(state, action.payload)
      state._inited = true
    },
    addProducts: (state, action: PayloadAction<Product[]>) => {
      console.log('See: addProducts:', action.payload)
      likedProductsAdapter.addMany(state, action.payload)
    },
    setPage: (state, action: PayloadAction<Pages>) => {
      const { totalCount, totalPages, currentPage } = action.payload

      state.totalCount = totalCount
      state.totalPages = totalPages
      state.currentPage = currentPage
    },
    restoreProducts: (state, action: PayloadAction<Product[]>) => {
      likedProductsAdapter.setAll(state, action.payload)
    },
    deleteOne: (state, action: PayloadAction<string>) => {
      likedProductsAdapter.removeOne(state, action.payload)
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  }
})

export const {
  actions: likedProductsActions,
  reducer: likedProductsReducer,
} = sliceLikedProducts