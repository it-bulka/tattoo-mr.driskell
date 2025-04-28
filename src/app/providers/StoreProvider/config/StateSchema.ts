import { CartSchema } from '@/entities/Cart'
import { rtkApi } from '@/shared/api/rtkApi.ts'
import { ProductsSchema, UserSchema, OrderSchema } from '@/entities'
import { SearchSchema } from '@/features/searchTattooMachine'

export interface StateSchema {
  cart: CartSchema
  products: ProductsSchema
  user: UserSchema
  order: OrderSchema
  search: SearchSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}