import { combineReducers } from '@reduxjs/toolkit'
import { likedProductsReducer } from '../slice/likedProductsSlice.tsx'
import { likedIdsReducer } from '../slice/likedIdsSlice.tsx'

export const favouritesReducer = combineReducers({
  products: likedProductsReducer,
  ids: likedIdsReducer
})