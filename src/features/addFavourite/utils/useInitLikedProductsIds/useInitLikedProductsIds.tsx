import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getFavouriteIds } from "../../model/service/getFavouriteIds.tsx";
import { useAppDispatch } from "@/app/providers/StoreProvider/config/store.ts";
import { getUserId } from "@/entities";

export const useInitLikedProductsIds = () => {
  const dispatch = useAppDispatch();
  const userId = useSelector(getUserId);

  useEffect(() => {
    if (userId) {
      dispatch(getFavouriteIds());
    }
  }, [dispatch, userId]);
};
