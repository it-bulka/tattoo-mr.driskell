import { cartActions } from "../slice/cartSlice.tsx";
import { cartApi } from "../api/cartApi.tsx";
import { CART_FORM_LOCALSTORAGE } from "@/shared/consts/localStorages.tsx";
import type { Dispatch } from "@reduxjs/toolkit";

export const clearCartAfterOrder = async (
  dispatch: Dispatch,
  userId?: string,
) => {
  localStorage.removeItem(CART_FORM_LOCALSTORAGE);
  dispatch(cartActions.clearCart());

  if (userId) {
    dispatch(
      cartApi.endpoints.syncCart.initiate({ userId, orderItems: [] }) as never,
    );
  }
};
