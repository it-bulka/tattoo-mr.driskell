import { Outlet } from 'react-router'
import { Header } from './Header/Header.tsx'
import { Footer } from './Footer/Footer.tsx'

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}