import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/providers/StoreProvider/config/store.ts";
import { getIsAuth } from "@/features/auth";
import { getUserId } from "../selector/getUserId.tsx";
import { auth } from "@/features/auth/model/api/auth.tsx";
import { userActions } from "../slice/userSlice.tsx";

export const useInitUser = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(getIsAuth);
  const userId = useSelector(getUserId);

  useEffect(() => {
    if (!isAuth || userId) return;

    dispatch(auth.endpoints.getMe.initiate())
      .unwrap()
      .then((res) => dispatch(userActions.setUser(res.data)))
      .catch(() => {});
  }, [dispatch, isAuth, userId]);
};
