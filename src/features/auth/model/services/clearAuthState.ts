import { authActions } from '../slice/authSlice.ts'
import { userActions } from '@/entities/User'
import { rtkApi } from '@/shared/api/rtkApi.ts'
import type { AppDispatch } from '@/app/providers/StoreProvider/config/store.ts'

export const clearAuthState = (dispatch: AppDispatch) => {
  dispatch(authActions.logout())
  dispatch(userActions.clearUser())
  dispatch(rtkApi.util.resetApiState())
}
