import { createAsyncThunk } from '@reduxjs/toolkit'
import { favouriteApi } from '@/features/addFavourite/model/api/favouriteApi.tsx'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { getUserId } from '@/entities'
import { getRejectedError } from '@/shared/libs'
import { likedProductsActions } from '../../slice/likedProductsSlice.tsx'
import { likedIdsActions } from '../../slice/likedIdsSlice.tsx'

export const deleteProductFromFavourites = createAsyncThunk<
  void,
  string,
  { state: StateSchema }
>(
  'favourites/deleteProductFromFavourites',
  async (favouriteId, { dispatch, getState }) => {
    const state = getState()
    const userId = getUserId(state)

    try {
      await dispatch(
        favouriteApi.endpoints.deleteFavourite.initiate({
          userId,
          productId: favouriteId
        })
      )

      dispatch(likedProductsActions.deleteOne(favouriteId))
      dispatch(likedIdsActions.deleteId(favouriteId))
    } catch (error) {
      const err = getRejectedError(error) || 'Something went wrong. Item is not deleted'
      throw Error(err)
    }
  }
)