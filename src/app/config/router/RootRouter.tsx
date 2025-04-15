import { MainLayout } from '@/shared/layouts'
import { useInitCart } from '@/entities/Cart'
import { useRestartInternet, useBeforeClosePage } from '@/shared/libs'

export const RootRouter = () => {
  // TODO: add just on auth here
  useInitCart()
  useRestartInternet()
  useBeforeClosePage()
  return <MainLayout />
}