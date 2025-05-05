import { useSelector } from 'react-redux'
import {
  canLoadMoreLikedSelector, fetchNextPageLikedProducts,
  getLikedErrorSelector,
  getLikedIsLoadingSelector,
  likedProductsSelector,
  getLikedTotalCountSelector
} from '@/features/addFavourite'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { useCallback } from 'react'

export const useGetLikedProducts = () => {
  const likedFullData = useSelector(likedProductsSelector.selectAll)
  const isFetching = useSelector(getLikedIsLoadingSelector)
  const error = useSelector(getLikedErrorSelector)
  const canLoadMore = useSelector(canLoadMoreLikedSelector)
  const totalAmount = useSelector(getLikedTotalCountSelector)
  const dispatch = useAppDispatch()

  const handleLoadMore = useCallback(() => {
    if (canLoadMore) {
      dispatch(fetchNextPageLikedProducts())
    }
  }, [dispatch, canLoadMore])

  return {
    data: likedFullData,
    error,
    isFetching,
    handleLoadMore,
    canLoadMore,
    totalAmount
  }
}