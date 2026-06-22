import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const VerifyEmailPageAsync = lazy(() => import('./VerifyEmailPage'))
export const VerifyEmailPage = withSuspense(VerifyEmailPageAsync)
