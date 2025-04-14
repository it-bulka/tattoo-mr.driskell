import { MainLayout } from '@/shared/layouts'
import { useInitCart } from '@/entities/Cart'

export const RootRouter = () => {
  // TODO: add just on auth here
  useInitCart()
  return <MainLayout />
}