import { AnyAction, Middleware } from '@reduxjs/toolkit'
import { AppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import debounce from 'lodash.debounce'
import { favouriteApi } from '../api/favouriteApi.tsx'
import { getUserId } from '@/entities'
import { selectPendingLikes } from '../selector/likedIdsSelectors.tsx'
import { likedIdsActions } from '../slice/likedIdsSlice.tsx'
import { getRejectedError } from '@/shared/libs'

let getState: (() => StateSchema) | null = null
let dispatch: AppDispatch

const debounceSyncLikedIdsWithBack = debounce(async () => {
  if (!getState || !dispatch || !navigator.onLine) return

  const state = getState()
  const userId = getUserId(state)
  const { pendingAddIds, pendingRemoveIds } = selectPendingLikes(state)

  if(!pendingAddIds.length && !pendingRemoveIds.length) return

  try {
    const res = await dispatch(
      favouriteApi.endpoints.batchFavourite.initiate({
        userId,
        idsToAdd: pendingAddIds,
        idsToRemove: pendingRemoveIds
      })
    ).unwrap()

    if(res.data) {
      const { added, removed } = res.data
      dispatch(likedIdsActions.confirmed({ added, removed }))
      dispatch(likedIdsActions.clearQueues())
    }

    if(res.error) {
      throw Error(res.error.message)
    }
  } catch (error) {
    const err = getRejectedError(error) || 'Something went wrong. Some likes are not added \ removed'
    dispatch(likedIdsActions.setError(err))
    dispatch(likedIdsActions.rollback())
  }
}, 1000)

const syncTriggerActions = [
  'liked/ids/addIdToAddQueue',
  'liked/ids/addIdToRemoveQueue',
]

export const likedIdsMiddleware: Middleware = store => {
  getState = store.getState
  dispatch = store.dispatch

  return next => (action) => {
    const result = next(action)

    const typedAction = action as AnyAction
    if(syncTriggerActions.includes(typedAction.type)) {
      debounceSyncLikedIdsWithBack()
    }

    return result
  }
}