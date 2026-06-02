import { rtkApi } from '@/shared/api/rtkApi.ts'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'

interface SearchTattooMachineState {
  search: string
  lang: string
}

interface SearchTattooMachineRes {
  data: Product[]
  success: boolean
}

const searchTattooApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getSearchedProducts: build.query<SearchTattooMachineRes, SearchTattooMachineState>({
      query: ({ search, lang }) => ({
        url: '/tattoo-machines/search',
        params: { search, lang }
      }),
      providesTags: (result) =>
        result?.data ? [{ type: 'Search' as const }] : [],
    })
  })
})


export const clearSearchTattooMachine = (cachedState: SearchTattooMachineState) => {
  return searchTattooApi.util.upsertQueryData(
    'getSearchedProducts',
    cachedState,
    {
      data: [],
      success: false,
    })
}

export const { useLazyGetSearchedProductsQuery, useGetSearchedProductsQuery } = searchTattooApi
