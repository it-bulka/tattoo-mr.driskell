import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { createSelector } from '@reduxjs/toolkit'

export const getLikedIdsSelector = (state: StateSchema) => state.favourites.ids.ids

export const getPendingAddIdsSelector = (state: StateSchema) => state.favourites.ids.pendingAddIds
export const getPendingRemoveIdsSelector = (state: StateSchema) => state.favourites.ids.pendingRemoveIds

export const selectPendingLikes = createSelector(
  [getPendingAddIdsSelector, getPendingRemoveIdsSelector],
  (pendingAddIds, pendingRemoveIds) => ({
    pendingAddIds,
    pendingRemoveIds
  })
)