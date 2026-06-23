import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/providers/StoreProvider/config/store.ts";
import { clearCartAfterOrder } from "@/entities/Cart";
import { getUserId } from "@/entities";

export const useClearCartOnSuccess = () => {
  const dispatch = useAppDispatch();
  const userId = useSelector(getUserId);
  const cleared = useRef(false);

  useEffect(() => {
    if (cleared.current) return;
    cleared.current = true;
    clearCartAfterOrder(dispatch, userId);
  }, [dispatch, userId]);
};
