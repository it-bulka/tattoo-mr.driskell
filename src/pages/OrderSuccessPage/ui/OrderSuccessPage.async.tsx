import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const OrderSuccessPageAsync = lazy(() => import('./OrderSuccessPage.tsx'))
export const OrderSuccessPage = withSuspense(OrderSuccessPageAsync)
