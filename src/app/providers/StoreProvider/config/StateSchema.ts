import { CartSchema } from '@/entities/Cart'
import { rtkApi } from '@/shared/api/rtkApi.ts'
import { ProductsSchema, UserSchema, OrderSchema } from '@/entities'
import { SearchSchema } from '@/features/searchTattooMachine'
import { FavouritesSchema } from '@/features/addFavourite/model/types'

export interface StateSchema {
  cart: CartSchema
  products: ProductsSchema
  user: UserSchema
  order: OrderSchema
  search: SearchSchema
  favourites: FavouritesSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}