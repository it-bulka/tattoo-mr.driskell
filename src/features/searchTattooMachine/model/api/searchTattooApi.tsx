import { rtkApi } from '@/shared/api/rtkApi.ts'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'

interface SearchTattooMachineState {
  search: string
}

interface SearchTattooMachineRes {
  data: Product[]
  success: boolean
}

const searchTattooApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getSearchedProducts: build.query<SearchTattooMachineRes, SearchTattooMachineState>({
      query: ({ search }) => ({
        url: '/tattoo-machines/search',
        params: { search }
      }),
      providesTags: (result) =>
        result?.data ? [{ type: 'Search' as const }] : [],
    })
  })
})


export const clearSearchTattooMachine = (cachedSearchBy: string) => {
  return searchTattooApi.util.upsertQueryData(
    'getSearchedProducts',
    { search: cachedSearchBy },
    {
      data: [],
      success: false,
    })
}

export const { useLazyGetSearchedProductsQuery } = searchTattooApi