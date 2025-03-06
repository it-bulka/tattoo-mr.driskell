import { Outlet } from 'react-router'
import { Header } from './Header/Header.tsx'
import { Footer } from './Footer/Footer.tsx'
import { ScrollUpToolbar } from '../../ui/ScrollUpToolbar/ScrollUpToolbar.tsx'

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollUpToolbar />
    </>
  )
}