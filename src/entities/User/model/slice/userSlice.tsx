import { createSlice } from '@reduxjs/toolkit'
import { UserSchema } from '@/entities/User'

// TODO: add dynamic id later
const initialState: UserSchema = {
  id: '67e423a7338425de0b07ed80'
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}
})

export const {
  actions: userActions,
  reducer: userReducer
} = userSlice