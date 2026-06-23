import { MainLayout } from "@/shared/layouts";
import { ScrollRestoration } from "react-router";
import { useInitCart } from "@/entities/Cart";
import { useRestartInternet, useBeforeClosePage } from "@/shared/libs";
import { useInitUser } from "@/entities/User";
import { useInitLikedProductsIds } from "@/features/addFavourite";

export const RootRouter = () => {
  useInitUser();
  useInitCart();
  useRestartInternet();
  useBeforeClosePage();
  useInitLikedProductsIds();
  return (
    <>
      <ScrollRestoration />
      <MainLayout />
    </>
  );
};
