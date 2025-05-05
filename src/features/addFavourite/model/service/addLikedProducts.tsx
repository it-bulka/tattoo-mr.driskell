import { createAsyncThunk } from '@reduxjs/toolkit'
import { favouriteApi } from '../api/favouriteApi.tsx'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { likedProductsActions } from '../slice/likedProductsSlice.tsx'
import { getRejectedError } from '@/shared/libs'
import {
  getLikedTotalCountSelector,
  getLikedActualAmountSelector,
  getLikedCurrentPageSelector, getItemsPerPageSelector
} from '../selector/likedProductsSelectors.tsx'
import { getUserId } from '@/entities'
import { AppDispatch } from '@/app/providers/StoreProvider/config/store.ts'

export const fetchNextPageLikedProducts = createAsyncThunk<
  void,
  void,
  { state: StateSchema, rejectValue: string, dispatch: AppDispatch }
>(
  'favourites/addLikedProducts',
  async (_, { getState, dispatch }) => {
    const state = getState()
    const totalCount = getLikedTotalCountSelector(state)
    const currentItemsAmount = getLikedActualAmountSelector(state)

    if(totalCount === currentItemsAmount) return

    const currentLikedPage = getLikedCurrentPageSelector(state)
    const nextPage = currentLikedPage + 1
    const limit = getItemsPerPageSelector(state)

    const userId = getUserId(state)

    try {
      dispatch(likedProductsActions.setLoading(true))
      const data = await dispatch(
        favouriteApi.endpoints.getFavourites.initiate({
          userId,
          page: nextPage,
          limit
        })
      ).unwrap()

      if(!data) return

      const {
        items,
        totalCount,
        totalPages,
        currentPage,
      } = data.data

      console.log('See: endpoints', data.data)
      dispatch(likedProductsActions.addProducts(items))
      dispatch(likedProductsActions.setPage({ totalCount, totalPages, currentPage }))
      dispatch(likedProductsActions.setLoading(false))

    } catch (error) {
      const err = getRejectedError(error) || 'Something went wrong. New page can not be found'
      dispatch(likedProductsActions.setError(err))
      dispatch(likedProductsActions.setLoading(false))
    }
  }
)