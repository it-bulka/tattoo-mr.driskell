import { Outlet } from 'react-router'
import { Header } from '@/shared/layouts/MainLayouts/Header/Header.tsx'

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}