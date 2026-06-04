import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

import { OrderFailurePageLoader } from './OrderFailurePageLoader'

const OrderFailurePageAsync = lazy(() => import('./OrderFailurePage.tsx'))
export const OrderFailurePage = withSuspense(OrderFailurePageAsync, <OrderFailurePageLoader />)
