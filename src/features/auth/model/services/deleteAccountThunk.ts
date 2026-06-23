import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "@/entities/User/model/api/userApi.tsx";
import { clearAuthState } from "./clearAuthState.ts";
import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema.ts";

export const deleteAccountThunk = createAsyncThunk<
  void,
  void,
  { state: StateSchema }
>("auth/deleteAccount", async (_, { rejectWithValue, dispatch, getState }) => {
  try {
    const userId = getState().user?.data?.id;

    if (!userId) return rejectWithValue("User not found");

    await dispatch(userApi.endpoints.deleteUser.initiate(userId)).unwrap();

    clearAuthState(dispatch);
  } catch {
    clearAuthState(dispatch);
    return rejectWithValue("Delete failed");
  }
});
