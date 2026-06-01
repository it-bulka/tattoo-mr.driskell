import { novaPoshtaApi } from '@/shared/api/novaPoshtaApi.ts'
import { NPCity, NPWarehouse, NPApiResponse, NPSettlementAddress } from '@/shared/api/novaPoshtaTypes.ts'

const NP_API_KEY = import.meta.env.VITE_NP_API_KEY ?? ''

const novaPoshtaFormApi = novaPoshtaApi.injectEndpoints({
  endpoints: (build) => ({
    searchNPCities: build.query<NPCity[], string>({
      query: (cityName) => ({
        url: '',
        method: 'POST',
        body: {
          apiKey: NP_API_KEY,
          modelName: 'Address',
          calledMethod: 'searchSettlements',
          methodProperties: {
            CityName: cityName,
            Limit: '10',
          },
        },
      }),
      transformResponse: (res: NPApiResponse<NPSettlementAddress>) =>
        res.data[0]?.Addresses ?? [],
      providesTags: ['NPCities'],
    }),

    getNPWarehouses: build.query<NPWarehouse[], { cityRef: string; typeRef?: string }>({
      query: ({ cityRef, typeRef }) => ({
        url: '',
        method: 'POST',
        body: {
          apiKey: NP_API_KEY,
          modelName: 'AddressGeneral',
          calledMethod: 'getWarehouses',
          methodProperties: {
            CityRef: cityRef,
            ...(typeRef ? { TypeOfWarehouseRef: typeRef } : {}),
          },
        },
      }),
      transformResponse: (res: NPApiResponse<NPWarehouse>) => res.data,
      providesTags: (_, __, { cityRef, typeRef }) => [
        { type: 'NPWarehouses' as const, id: `${cityRef}_${typeRef}` },
      ],
    }),
  }),
  overrideExisting: false,
})

export const { useSearchNPCitiesQuery, useGetNPWarehousesQuery } = novaPoshtaFormApi
