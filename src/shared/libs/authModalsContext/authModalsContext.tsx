import { createContext, useContext } from 'react'

export interface AuthModalsContextValue {
  openLogin: () => void
  openRegister: () => void
  openAuthRequired: () => void
}

export const AuthModalsContext = createContext<AuthModalsContextValue | null>(null)

export const useAuthModals = (): AuthModalsContextValue => {
  const ctx = useContext(AuthModalsContext)
  if (!ctx) throw new Error('useAuthModals must be used inside AuthModalsContext.Provider')
  return ctx
}
