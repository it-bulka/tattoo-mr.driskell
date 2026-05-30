import cls from './MainLayouts.module.scss'
import { Outlet } from 'react-router'
import { Header } from './Header/Header.tsx'
import { Footer } from './Footer/Footer.tsx'
import { ScrollUpToolbar } from '../../ui/ScrollUpToolbar/ScrollUpToolbar.tsx'
import { RegistrationModal } from '@/features'
import { useState } from 'react'

export const MainLayout = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  return (
    <div className={cls.mainLayout}>
      <Header className={cls.noGrow}/>
      <main>
        <Outlet />
      </main>
      <Footer className={cls.noGrow}/>
      <ScrollUpToolbar />

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </div>
  )
}