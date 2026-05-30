import { createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../api/auth.tsx';
import { DEVICE_ID_LOCALSTORAGE } from '@/shared/consts';
import { setUUID } from '@/shared/libs';
import { userActions } from '@/entities/User';
import { VerifyEmailReq } from '../types/verifyEmail.ts'

export const verifyEmailThunk = createAsyncThunk<
  { token: string; deviceId: string },
  VerifyEmailReq
>(
  'auth/verifyEmail',
  async (data, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi

    if(!data.verificationToken || !data.email) {
      return rejectWithValue('Unauthorized');
    }

    try {
      const response = await dispatch(
        auth.endpoints.verifyEmail.initiate(data)
      ).unwrap()

      const deviceId = localStorage.getItem(DEVICE_ID_LOCALSTORAGE) ?? setUUID(DEVICE_ID_LOCALSTORAGE)

      if(response.data) {
        await dispatch(userActions.setUser(response.data))
      }

      return {
        token: response.accessToken,
        deviceId: deviceId
      }
    } catch (e) {
      console.log(e)
      return rejectWithValue('Unauthorized')
    }
  }
)