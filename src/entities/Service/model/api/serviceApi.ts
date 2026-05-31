import { rtkApi } from '@/shared/api/rtkApi'
import { Service } from '../types/serviceSchema'

export const serviceApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getServices: build.query<Service[], void>({
      query: () => ({ url: '/services' }),
      transformResponse: (res: { data: Service[] }) => res.data,
      providesTags: ['Services'],
    }),
  }),
})

export const { useGetServicesQuery } = serviceApi
