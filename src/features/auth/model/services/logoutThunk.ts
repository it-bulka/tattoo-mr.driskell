import { createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../api/auth.tsx'
import { userActions } from '@/entities/User'
import { authActions } from '../slice/authSlice.ts'
import { rtkApi } from '@/shared/api/rtkApi.ts'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'

const clearLocalState = (dispatch: any) => {
  dispatch(authActions.logout())
  dispatch(userActions.clearUser())
  dispatch(rtkApi.util.resetApiState())
}

export const logoutThunk = createAsyncThunk<void, void, { state: StateSchema }>(
  'auth/logout',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const userId = getState().user?.data?.id

      await dispatch(auth.endpoints.logout.initiate(userId)).unwrap()

      clearLocalState(dispatch)
    } catch (e) {
      clearLocalState(dispatch)
      return rejectWithValue('Logout failed')
    }
  }
)
