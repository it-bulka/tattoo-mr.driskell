import { CartSchema } from '@/entities/Cart'
import { rtkApi } from '@/shared/api/rtkApi.ts'
import { ProductsSchema } from '@/entities'

export interface StateSchema {
  cart: CartSchema
  products: ProductsSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}