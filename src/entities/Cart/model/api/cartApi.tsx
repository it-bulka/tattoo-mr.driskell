import { rtkApi } from '@/shared/api/rtkApi.ts'
import { CartData } from '@/entities/Cart'

interface SyncCartBody {
  userId: string,
  orderItems: { product: string; amount: number }[]
}

interface ReturnCartData {
  data: CartData
}
export const cartApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getCart: build.query({
      query: ({ userId }) => ({
        url: '/carts',
        params: { userId }
      })
    }),
    syncCart: build.mutation<ReturnCartData, SyncCartBody>({
      query: body => ({
        url: '/carts/sync',
        method: 'POST',
        body,
      }),
    }),
  })
})

export const { useGetCartQuery } = cartApi