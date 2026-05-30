import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import i18n from 'i18next'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { ACCESS_TOKEN_LOCALSTORAGE, DEVICE_ID_LOCALSTORAGE } from '@/shared/consts'

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as StateSchema
      const currentLang = i18n.language
      headers.set('Accept-Language', currentLang)

      // auth
      const token = state.auth.accessToken || localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      const deviceId = state.auth.deviceId || localStorage.getItem(DEVICE_ID_LOCALSTORAGE)
      if (deviceId) {
        headers.set('Device-Id', deviceId)
      }

      return headers
    }
  }),
  endpoints: () => ({}),
  tagTypes: ['Search'],
})