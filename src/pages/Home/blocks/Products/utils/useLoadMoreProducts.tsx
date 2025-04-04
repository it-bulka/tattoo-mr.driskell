import { useAppDispatch } from "@/app/providers/StoreProvider/config/store.js"
import { useCallback } from 'react'
import { productsActions } from '@/entities'

interface UseLoadMoreProps {
  key: string
  currentPage: number
  totalPages: number
}

export const useLoadMore = ({ key, currentPage, totalPages }: UseLoadMoreProps) => {
  const dispatch = useAppDispatch()

  const handleLoadMore = useCallback(() => {
    if (currentPage < totalPages) {
      dispatch(productsActions.setPage({ key, page: currentPage + 1 }))
    }
  }, [dispatch, key, currentPage, totalPages])

  return handleLoadMore
}