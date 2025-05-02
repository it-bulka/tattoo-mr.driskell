import { createAsyncThunk } from '@reduxjs/toolkit'
import { favouriteApi } from '../api/favouriteApi.tsx'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { getUserId } from '@/entities'
import { AppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { likedIdsActions } from '../slice/likedIdsSlice.tsx'
import { getRejectedError } from '@/shared/libs';

export const getFavouriteIds = createAsyncThunk<
  void,
  void,
  { state: StateSchema, dispatch: AppDispatch }
>(
  'favourites/getFavouriteIds',
  async (_, { dispatch, getState }) => {
    const state = getState()
    const userId = getUserId(state)
    if(!userId) return

    try {
      const data = await dispatch(
        favouriteApi.endpoints.getAllFavouritesIds.initiate(userId)
      ).unwrap()

      dispatch(likedIdsActions.init(data.data))

    } catch (error) {
      const err = getRejectedError(error) || 'Failed to fetch favourite ids'
      dispatch(likedIdsActions.setError(err))
    }
  }
)