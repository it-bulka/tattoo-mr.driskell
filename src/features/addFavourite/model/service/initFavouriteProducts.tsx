import { createAsyncThunk } from '@reduxjs/toolkit'
import { favouriteApi } from '../api/favouriteApi.tsx'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { likedProductsActions } from '../slice/likedProductsSlice.tsx'
import { getRejectedError } from '@/shared/libs'
import { getItemsPerPageSelector, getLikedInitedSelector } from '../selector/likedProductsSelectors.tsx'
import { getUserId } from '@/entities'
import { AppDispatch } from '@/app/providers/StoreProvider/config/store.ts'

export const initFavouriteProducts = createAsyncThunk<
  void,
  void,
  { state: StateSchema, rejectValue: string, dispatch: AppDispatch }
>(
  'favourites/addLikedProducts',
  async (_, { getState, dispatch }) => {
    const state = getState()
    const isInited = getLikedInitedSelector(state)
    if (isInited) return

    const limit = getItemsPerPageSelector(state)
    const userId = getUserId(state)

    try {
      dispatch(likedProductsActions.setLoading(true))
      const data = await dispatch(
        favouriteApi.endpoints.getFavourites.initiate({
          userId,
          page: 1,
          limit
        })
      ).unwrap()

      if(!data) return

      const { items, totalCount, totalPages, currentPage } = data.data

      console.log('See: endpoints', data)

      dispatch(likedProductsActions.initProducts(items))
      dispatch(likedProductsActions.setPage({ totalCount, totalPages, currentPage }))
      dispatch(likedProductsActions.setLoading(false))

    } catch (error) {
      const err = getRejectedError(error) || 'Something went wrong. New page can not be found'
      dispatch(likedProductsActions.setError(err))
      dispatch(likedProductsActions.setLoading(false))
    }
  }
)