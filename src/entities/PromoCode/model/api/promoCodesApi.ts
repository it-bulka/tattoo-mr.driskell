import { rtkApi } from '@/shared/api/rtkApi.ts'
import { PromoCodeItem } from '../type/promoCode.ts'

interface PromoCodesResponse {
  data: PromoCodeItem[]
  success: boolean
}

export const promoCodesApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getPromoCodes: build.query<PromoCodeItem[], void>({
      query: () => ({ url: '/promo' }),
      transformResponse: (res: PromoCodesResponse) => res.data,
      keepUnusedDataFor: 3600,
    }),
  }),
})

export const { useGetPromoCodesQuery } = promoCodesApi
