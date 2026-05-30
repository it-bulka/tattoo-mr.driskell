import { CartSchema } from '@/entities/Cart'
import { rtkApi } from '@/shared/api/rtkApi.ts'
import { ProductsSchema, UserSchema, OrderSchema } from '@/entities'
import { SearchSchema } from '@/features/searchTattooMachine'
import { FavouritesSchema } from '@/features/addFavourite/model/types'
import { SessionSchema } from '@/entities/session/model/types'
import { AuthSchema } from '@/features/auth'

export interface StateSchema {
  cart: CartSchema
  products: ProductsSchema
  user: UserSchema,
  auth: AuthSchema,
  order: OrderSchema
  search: SearchSchema
  favourites: FavouritesSchema
  session: SessionSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}