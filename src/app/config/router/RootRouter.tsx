import { MainLayout } from '@/shared/layouts'
import { useInitCart } from '@/entities/Cart'
import { useRestartInternet, useBeforeClosePage } from '@/shared/libs'
import { useInitLikedProductsIds } from '@/features/addFavourite'

export const RootRouter = () => {
  // TODO: add just on auth here
  useInitCart()
  useRestartInternet()
  useBeforeClosePage()
  useInitLikedProductsIds()
  return <MainLayout />
}