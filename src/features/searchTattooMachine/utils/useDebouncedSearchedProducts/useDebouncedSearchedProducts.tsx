import {
  clearSearchTattooMachine,
  useLazyGetSearchedProductsQuery
} from '../../model/api/searchTattooApi.tsx'
import { useCallback, useEffect, useRef } from 'react'
import debounce from 'lodash.debounce'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { searchActions } from '../../model/slice/searchSlice.tsx'


export const useDebouncedSearchedProducts = (search: string) => {
  const [trigger, { data, isFetching }] = useLazyGetSearchedProductsQuery()
  const lastRequestRef = useRef<ReturnType<typeof trigger> | null>(null)
  const lastRequestSearchRef = useRef<string| null>(null)
  const dispatch = useAppDispatch()

  const debouncedRequest = useCallback(debounce((searchBy: string) => {
    if (lastRequestRef.current) {
      lastRequestRef.current.abort()
    }

    const request = trigger({ search: searchBy})
    lastRequestRef.current = request
    lastRequestSearchRef.current = searchBy
    dispatch(searchActions.setSearchValue(searchBy))
  }, 1000), [trigger, dispatch])

  const clearLastRequestData = () => {
    dispatch(clearSearchTattooMachine(lastRequestSearchRef.current || ''))
  }

  useEffect(() => {
    search && debouncedRequest(search)

    return () => {
      debouncedRequest.cancel()
    }
  }, [search])

  return { data, isFetching, clearLastRequestData }
}