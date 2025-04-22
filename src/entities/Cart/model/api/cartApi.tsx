import { rtkApi } from '@/shared/api/rtkApi.ts'
import { CartDataRes, SyncCartBody } from '@/entities/Cart'
import { PromoActivationReq } from '../type/cartSchema.tsx'

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
    activatePromo: build.mutation<ReturnCartData, PromoActivationReq>({
      query: body => ({
        url: '/promo/activate',
        method: 'POST',
        body
      })
    })
  })
})

export const { useGetCartQuery } = cartApi