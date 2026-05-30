import { createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../api/auth.tsx'
import { userActions } from '@/entities/User';

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await dispatch(
        auth.endpoints.logout.initiate()
      )

      dispatch(userActions.clearUser())
    } catch (e) {
      console.log(e)
      return rejectWithValue('Logout failed')
    }
  }
)