import { createAsyncThunk } from '@reduxjs/toolkit'
import { favouriteApi } from '../../api/favouriteApi.tsx'
import { likedProductsSelector } from '../../slice/likedProductsSlice.tsx'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { getUserId } from '@/entities'
import {
  getItemsPerPageSelector,
  getLikedCurrentPageSelector
} from '../../selector/likedProductsSelectors.tsx'
import { likedProductsActions } from '../../slice/likedProductsSlice.tsx'
import { getRejectedError } from '@/shared/libs'

export const updateLikesAfterDeletingOne = createAsyncThunk<
  void,
  void,
  { state: StateSchema }
>(
  'favourites/addLikedProducts',
  async (_, { getState, dispatch }) => {
    const state = getState()

    const userId = getUserId(state)
    const actualFavourites = likedProductsSelector.selectAll(state)

    const currentPage = getLikedCurrentPageSelector(state)
    const itemsPerPage = getItemsPerPageSelector(state)

    const actualItems = actualFavourites.slice(0, -1)

    try {
      // Rewriting last page for filling deleted one
      const {data} = await dispatch(
        favouriteApi.endpoints.getFavourites.initiate({
          userId,
          page: currentPage,
          limit: itemsPerPage
        })
      ).unwrap()

      const { items: rewrittenItems, totalCount, totalPages, currentPage: pageCurrent } = data

      dispatch(likedProductsActions.restoreProducts([...actualItems, ...rewrittenItems]))
      dispatch(likedProductsActions.setPage({
        totalCount,
        totalPages,
        currentPage: pageCurrent
      }))
    } catch (error) {
      const err = getRejectedError(error) || 'Something went wrong. Page is not updated after deleting item'
      throw Error(err)
    }
  }
)