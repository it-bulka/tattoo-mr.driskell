import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const OrderFailurePageAsync = lazy(() => import('./OrderFailurePage.tsx'))
export const OrderFailurePage = withSuspense(OrderFailurePageAsync)
