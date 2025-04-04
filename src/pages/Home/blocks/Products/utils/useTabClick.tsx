import { useSearchParams } from 'react-router'
import { useCallback } from 'react'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { ProductCategory, productsActions } from '@/entities'

type Tab = { id: ProductCategory, name: string}

export const useTabClick = ({ key }: { key: string }) => {
  const [_, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  const handleClick = useCallback((tab: Tab) => {
    dispatch(productsActions.setCategory({key, category: tab.id }))
    dispatch(productsActions.setPage({key, page: 1 }))
    setSearchParams({ category: tab.id })
  }, [])

  return handleClick
}