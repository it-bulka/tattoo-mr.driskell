import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import i18n from 'i18next'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { ACCESS_TOKEN_LOCALSTORAGE, DEVICE_ID_LOCALSTORAGE } from '@/shared/consts'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as StateSchema
    headers.set('Accept-Language', i18n.language)

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
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: '/auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as { accessToken: string }
      localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE, accessToken)
      // auth/setAccessToken and auth/logout — string dispatch to avoid circular FSD imports
      api.dispatch({ type: 'auth/setAccessToken', payload: accessToken })
      result = await baseQuery(args, api, extraOptions)
    } else {
      localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE)
      api.dispatch({ type: 'auth/logout' })
    }
  }

  return result
}

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: false,
  endpoints: () => ({}),
  tagTypes: ['Search', 'User', 'UserOrders', 'Services'],
})