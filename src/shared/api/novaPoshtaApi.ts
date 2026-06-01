import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const novaPoshtaApi = createApi({
  reducerPath: 'novaPoshtaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.novaposhta.ua/v2.0/json/',
  }),
  endpoints: () => ({}),
  tagTypes: ['NPCities', 'NPWarehouses'],
  keepUnusedDataFor: 300,
})
