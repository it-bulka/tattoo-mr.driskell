import { rtkApi } from '@/shared/api/rtkApi.ts'
import { CartDataRes, SyncCartBody } from '@/entities/Cart'

interface ReturnCartData {
  data: CartDataRes
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