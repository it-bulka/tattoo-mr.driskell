import { useSelector } from 'react-redux'
import { fetchNextPageLikedProducts } from '@/features/addFavourite/model/service/addLikedProducts';
import { likedProductsSelector } from '@/features/addFavourite/model/slice/likedProductsSlice';
import {
  canLoadMoreLikedSelector,
  getLikedErrorSelector,
  getLikedIsLoadingSelector,
  getLikedTotalCountSelector
} from '@/features/addFavourite/model/selector/likedProductsSelectors'
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