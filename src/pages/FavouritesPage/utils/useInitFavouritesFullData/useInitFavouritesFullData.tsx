import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/providers/StoreProvider/config/store.ts";
import { initFavouriteProducts } from "@/features/addFavourite/model/service/initFavouriteProducts";
import { getUserId } from "@/entities";

export const useInitFavouritesFullData = () => {
  const dispatch = useAppDispatch();
  const userId = useSelector(getUserId);

  useEffect(() => {
    if (userId) {
      dispatch(initFavouriteProducts());
    }
  }, [dispatch, userId]);
};
