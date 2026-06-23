import { authActions } from "../slice/authSlice.ts";
import { userActions } from "@/entities/User";
import { rtkApi } from "@/shared/api/rtkApi.ts";
import type { Dispatch } from "@reduxjs/toolkit";

export const clearAuthState = (dispatch: Dispatch) => {
  dispatch(authActions.logout());
  dispatch(userActions.clearUser());
  dispatch(rtkApi.util.resetApiState());
};
