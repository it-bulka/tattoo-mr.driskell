import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

import { OrderSuccessPageLoader } from './OrderSuccessPageLoader'

const OrderSuccessPageAsync = lazy(() => import('./OrderSuccessPage.tsx'))
export const OrderSuccessPage = withSuspense(OrderSuccessPageAsync, <OrderSuccessPageLoader />)
