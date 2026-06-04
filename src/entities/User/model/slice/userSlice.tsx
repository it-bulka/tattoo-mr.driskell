import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { UserSchema, User } from '../type/userSchema.tsx'

const initialState: UserSchema = {
  loading: false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload
      state.loading = false
      state.error = undefined
    },
    clearUser: (state) => {
      state.data = undefined
      state.loading = false
      state.error = undefined
    },
    loadUser: (state) => {
      state.loading = true
      state.data = undefined
      state.error = undefined
    }
  }
})

export const {
  actions: userActions,
  reducer: userReducer
} = userSlice