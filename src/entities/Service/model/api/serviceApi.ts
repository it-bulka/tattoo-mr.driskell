import { rtkApi } from '@/shared/api/rtkApi'
import { Service } from '../types/serviceSchema'

export const serviceApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getServices: build.query<Service[], void>({
      query: () => ({ url: '/services' }),
      transformResponse: (res: { data: Service[] }) => res.data,
      providesTags: ['Services'],
      keepUnusedDataFor: 3600,
    }),
  }),
})

export const { useGetServicesQuery } = serviceApi
