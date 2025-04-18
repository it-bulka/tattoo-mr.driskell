import { CartSchema } from '@/entities/Cart'
import { rtkApi } from '@/shared/api/rtkApi.ts'
import { ProductsSchema, UserSchema, OrderSchema } from '@/entities'

export interface StateSchema {
  cart: CartSchema
  products: ProductsSchema
  user: UserSchema
  order: OrderSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}