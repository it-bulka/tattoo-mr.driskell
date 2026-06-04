import { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import { getIsAuth } from '@/features/auth'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig'

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = useSelector(getIsAuth)
  return isAuth ? <>{children}</> : <Navigate to={RoutePaths.home} replace />
}
