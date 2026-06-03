import { rtkApi } from '@/shared/api/rtkApi.ts'
import { Brand } from '@/shared/type/brand.ts'

const brandsApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getBrands: build.query<Brand[], string>({
      query: () => ({ url: '/brands' }),
    }),
  }),
})

export const { useGetBrandsQuery } = brandsApi
export { brandsApi }
