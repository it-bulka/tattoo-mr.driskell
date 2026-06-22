import { MainLayout } from '@/shared/layouts'
import { ScrollRestoration } from 'react-router'
import { useInitCart } from '@/entities/Cart'
import { useRestartInternet, useBeforeClosePage } from '@/shared/libs'
import { useInitLikedProductsIds } from '@/features/addFavourite'

export const RootRouter = () => {
  useInitCart()
  useRestartInternet()
  useBeforeClosePage()
  useInitLikedProductsIds()
  return (
    <>
      <ScrollRestoration />
      <MainLayout />
    </>
  )
}