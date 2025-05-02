import { likedProductsReducer } from '../slice/likedProductsSlice.tsx'
import { likedIdsReducer } from '../slice/likedIdsSlice.tsx'

export type FavouritesSchema = {
  products: ReturnType<typeof likedProductsReducer>
  ids: ReturnType<typeof likedIdsReducer>
}