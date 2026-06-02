import {
  clearSearchTattooMachine,
  useLazyGetSearchedProductsQuery
} from '../../model/api/searchTattooApi.tsx'
import { useCallback, useEffect, useRef } from 'react'
import debounce from 'lodash.debounce'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { searchActions } from '../../model/slice/searchSlice.tsx'
import { useTranslation } from 'react-i18next'

export const useDebouncedSearchedProducts = (search: string) => {
  const [trigger, { data, isFetching }] = useLazyGetSearchedProductsQuery()
  const lastRequestRef = useRef<ReturnType<typeof trigger> | null>(null)
  const lastRequestStateRef = useRef<{ search: string; lang: string } | null>(null)
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()

  const debouncedRequest = useCallback(debounce((searchBy: string, lang: string) => {
    if (lastRequestRef.current) {
      lastRequestRef.current.abort()
    }

    const request = trigger({ search: searchBy, lang })
    lastRequestRef.current = request
    lastRequestStateRef.current = { search: searchBy, lang }
    dispatch(searchActions.setSearchValue(searchBy))
  }, 400), [trigger, dispatch])

  const clearLastRequestData = () => {
    if (lastRequestStateRef.current) {
      dispatch(clearSearchTattooMachine(lastRequestStateRef.current))
    }
  }

  useEffect(() => {
    if (search) debouncedRequest(search, i18n.language)

    return () => {
      debouncedRequest.cancel()
    }
  }, [search, i18n.language])

  return { data, isFetching, clearLastRequestData }
}
