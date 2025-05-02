import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LikedIdsSchema } from '@/features/addFavourite/model/types/likedIds.tsx'
import { IdMap } from '../types/likedIds.tsx'

const initialState: LikedIdsSchema = {
  ids: {},
  confirmed: {},
  pendingRemoveIds: [],
  pendingAddIds: [],
  error: null
}

export const likedIdsSlice = createSlice({
  name: 'liked/ids',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<string[]>) => {
      const ids = Object.fromEntries(action.payload.map(id => [id, true])) as IdMap
      state.ids = ids
      state.confirmed = ids
    },
    deleteId: (state, action: PayloadAction<string>) => {
      delete state.ids[action.payload]
    },
    addId: (state, action: PayloadAction<string>) => {
      state.ids[action.payload] = true
    },
    addIdToAddQueue: (state, action: PayloadAction<string>) => {
      state.pendingAddIds.push(action.payload)
      state.pendingRemoveIds.filter(id => id !== action.payload) //if previously removed without request to back
    },
    addIdToRemoveQueue: (state, action: PayloadAction<string>) => {
      state.pendingRemoveIds.push(action.payload)
      state.pendingAddIds.filter(id => id !== action.payload) //if previously removed without request to back
    },
    clearQueues: (state) => {
      state.pendingRemoveIds = []
      state.pendingAddIds = []
    },
    rollback: (state) => {
      state.ids = state.confirmed
    },
    confirmed: (state, action: PayloadAction<{added: string[], removed: string[]}>) => {
      const { added, removed } = action.payload

      const idsToAdd = Object.fromEntries(added.map(id => [id, true])) as IdMap
      state.confirmed = {...state.confirmed, ...idsToAdd }

      removed.forEach((id) => {
        delete state.confirmed[id]
      })
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  }
})

export const {
  actions: likedIdsActions,
  reducer: likedIdsReducer,
} = likedIdsSlice