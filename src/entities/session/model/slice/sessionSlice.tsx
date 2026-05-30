import { createSlice } from '@reduxjs/toolkit'
import { SessionSchema } from '../types/sessionSchema.tsx'
import { PayloadAction } from '@reduxjs/toolkit'

const initialState: SessionSchema = {}
const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload
    },
    deleteAccessToken(state) {
      state.accessToken = undefined
    },
    setDeviceId(state, action: PayloadAction<string>) {
      state.deviceId = action.payload
    },
    deleteDeviceId(state) {
      state.deviceId = undefined
    },
    clearSession(state) {
      state.accessToken = undefined
      state.deviceId = undefined
    }
  }
})

export const {
  actions: sessionActions,
  reducer: sessionReducer
} = sessionSlice