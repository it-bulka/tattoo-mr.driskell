import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteProductFromFavourites } from './deleteProductFromFavourites.tsx'
import { AppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { updateLikesAfterDeletingOne } from './updateLikesAfterDelete.tsx'
import { likedProductsActions } from '../../slice/likedProductsSlice.tsx'
import { getRejectedError } from '@/shared/libs'

export const deleteItemAndRefreshFavourites = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch }
>(
  'favourites/deleteItemAndRefreshFavourites',
  async (favouriteId, { dispatch }) => {
    dispatch(likedProductsActions.setLoading(true))
    try {
      await dispatch(deleteProductFromFavourites(favouriteId))
      await dispatch(updateLikesAfterDeletingOne())
    } catch (error) {
      const err = getRejectedError(error) || 'Something went wrong'
      dispatch(likedProductsActions.setError(err))
    }
    dispatch(likedProductsActions.setLoading(false))
  }
)