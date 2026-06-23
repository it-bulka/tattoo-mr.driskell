import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../api/auth.tsx";
import { LoginFormData } from "../types/login.ts";
import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema.ts";
import { AppDispatch } from "@/app/providers/StoreProvider/config/store.ts";
import {
  DEVICE_ID_LOCALSTORAGE,
  ACCESS_TOKEN_LOCALSTORAGE,
} from "@/shared/consts";
import { setUUID } from "@/shared/libs";
import { userActions } from "@/entities/User";
import { guestCartStorage, cartActions } from "@/entities/Cart";

export const loginThunk = createAsyncThunk<
  { token: string; deviceId: string },
  LoginFormData,
  {
    state: StateSchema;
    dispatch: AppDispatch;
    rejectValue: string;
  }
>("auth/login", async (data, thunkApi) => {
  const { dispatch, rejectWithValue } = thunkApi;

  try {
    const response = await dispatch(
      auth.endpoints.login.initiate(data),
    ).unwrap();

    const deviceId =
      localStorage.getItem(DEVICE_ID_LOCALSTORAGE) ??
      setUUID(DEVICE_ID_LOCALSTORAGE);

    if (response.data) {
      await dispatch(userActions.setUser(response.data));
    }

    localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE, response.accessToken);

    const guestItems = guestCartStorage.get();
    if (guestItems.length > 0) {
      dispatch(cartActions.addItems(guestItems));
      guestCartStorage.clear();
    }

    return {
      token: response.accessToken,
      deviceId: deviceId,
    };
  } catch (e) {
    console.log(e);
    return rejectWithValue("Unauthorized");
  }
});
