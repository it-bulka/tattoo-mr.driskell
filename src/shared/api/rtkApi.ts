import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import i18n from 'i18next'

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
    prepareHeaders: headers => {
      const currentLang = i18n.language

      headers.set('Accept-Language', currentLang)
      return headers
    }
  }),
  endpoints: () => ({})
})