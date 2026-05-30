import { createSlice } from '@reduxjs/toolkit'
import { loginThunk } from '../services/loginThunk.ts'
import { AuthSchema } from '../types/AuthSchema.ts'
import { PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthSchema = {}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
})

export const {
  reducer: authReducer,
} = authSlice