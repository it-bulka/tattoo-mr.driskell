import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const ResetPasswordPageAsync = lazy(() => import('./ResetPasswordPage'))
export const ResetPasswordPage = withSuspense(ResetPasswordPageAsync)
