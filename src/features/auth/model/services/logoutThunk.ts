import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../api/auth.tsx";
import { clearAuthState } from "./clearAuthState.ts";
import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema.ts";

export const logoutThunk = createAsyncThunk<void, void, { state: StateSchema }>(
  "auth/logout",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const userId = getState().user?.data?.id;

      await dispatch(auth.endpoints.logout.initiate(userId)).unwrap();

      clearAuthState(dispatch);
    } catch {
      clearAuthState(dispatch);
      return rejectWithValue("Logout failed");
    }
  },
);
