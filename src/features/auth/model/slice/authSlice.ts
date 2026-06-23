import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginThunk } from '../services/loginThunk.ts'
import { verifyEmailThunk } from '../services/verifyEmailThunk.ts'
import { AuthSchema } from '../types/AuthSchema.ts'
import { ACCESS_TOKEN_LOCALSTORAGE, DEVICE_ID_LOCALSTORAGE } from '@/shared/consts'

const initialState: AuthSchema = {
  accessToken: localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE),
  deviceId: localStorage.getItem(DEVICE_ID_LOCALSTORAGE),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    logout: (state) => {
      state.accessToken = null
      state.deviceId = null
      localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE)
    },
  },
  extraReducers: builder =>
    builder
      .addCase(loginThunk.pending, () => {

      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<{ token: string, deviceId: string}>) => {
        state.accessToken = action.payload.token
        state.deviceId = action.payload.deviceId
      })
      .addCase(loginThunk.rejected, () => {

      })
      .addCase(verifyEmailThunk.fulfilled, (state, action: PayloadAction<{ token: string, deviceId: string}>) => {
        state.accessToken = action.payload.token
        state.deviceId = action.payload.deviceId
      })
})

export const {
  reducer: authReducer,
  actions: authActions,
} = authSlice