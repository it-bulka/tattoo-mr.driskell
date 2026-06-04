import cls from './MainLayouts.module.scss'
import { Outlet } from 'react-router'
import { Header } from './Header/Header.tsx'
import { Footer } from './Footer/Footer.tsx'
import { ScrollUpToolbar } from '../../ui/ScrollUpToolbar/ScrollUpToolbar.tsx'
import { lazy, Suspense, useState, useEffect } from 'react'

const RegistrationModal = lazy(() =>
  import('@/features/auth/registration/ui/RegistrationModal').then(m => ({ default: m.RegistrationModal }))
)

export const MainLayout = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [registrationMounted, setRegistrationMounted] = useState(false)

  useEffect(() => {
    if (isRegistrationOpen) setRegistrationMounted(true)
  }, [isRegistrationOpen])

  return (
    <div className={cls.mainLayout}>
      <Header className={cls.noGrow}/>
      <main>
        <Outlet />
      </main>
      <Footer className={cls.noGrow}/>
      <ScrollUpToolbar />

      {registrationMounted && (
        <Suspense fallback={null}>
          <RegistrationModal
            isOpen={isRegistrationOpen}
            onClose={() => setIsRegistrationOpen(false)}
          />
        </Suspense>
      )}
    </div>
  )
}