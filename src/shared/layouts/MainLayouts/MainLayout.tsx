import cls from './MainLayouts.module.scss'
import { Outlet } from 'react-router'
import { Header } from './Header/Header.tsx'
import { Footer } from './Footer/Footer.tsx'
import { ScrollUpToolbar } from '../../ui/ScrollUpToolbar/ScrollUpToolbar.tsx'
import { lazy, Suspense, useState, useEffect, useCallback } from 'react'

const RegistrationModal = lazy(() =>
  import('@/features/auth/registration/ui/RegistrationModal').then(m => ({ default: m.RegistrationModal }))
)

const LoginModal = lazy(() =>
  import('@/features/auth/login/ui/LoginModal').then(m => ({ default: m.LoginModal }))
)

const ForgotPasswordModal = lazy(() =>
  import('@/features/auth/forgotPassword/ui/ForgotPasswordModal').then(m => ({ default: m.ForgotPasswordModal }))
)

const preloadAuthModals = () => {
  import('@/features/auth/registration/ui/RegistrationModal')
  import('@/features/auth/forgotPassword/ui/ForgotPasswordModal')
}

export const MainLayout = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [loginMounted, setLoginMounted] = useState(false)
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)

  useEffect(() => { if (isLoginOpen) setLoginMounted(true) }, [isLoginOpen])

  const openLogin = useCallback(() => {
    preloadAuthModals()
    setIsRegistrationOpen(false)
    setIsForgotPasswordOpen(false)
    setIsLoginOpen(true)
  }, [])

  const openRegister = useCallback(() => {
    setIsLoginOpen(false)
    setIsForgotPasswordOpen(false)
    setIsRegistrationOpen(true)
  }, [])

  const openForgotPassword = useCallback(() => {
    setIsLoginOpen(false)
    setIsRegistrationOpen(false)
    setIsForgotPasswordOpen(true)
  }, [])

  return (
    <div className={cls.mainLayout}>
      <Header className={cls.noGrow} onOpenLogin={openLogin} />
      <main>
        <Outlet />
      </main>
      <Footer className={cls.noGrow}/>
      <ScrollUpToolbar />

      <Suspense fallback={null}>
        <RegistrationModal
          isOpen={isRegistrationOpen}
          onClose={() => setIsRegistrationOpen(false)}
          onOpenLogin={openLogin}
        />
      </Suspense>

      {loginMounted && (
        <Suspense fallback={null}>
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onOpenRegister={openRegister}
            onOpenForgotPassword={openForgotPassword}
          />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <ForgotPasswordModal
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
          onOpenLogin={openLogin}
          onOpenRegister={openRegister}
        />
      </Suspense>
    </div>
  )
}
