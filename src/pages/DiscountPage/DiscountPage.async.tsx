import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

import { DiscountPageLoader } from './DiscountPageLoader'

const DiscountPageAsync = lazy(() => import('./DiscountPage.tsx'))
export const DiscountPage = withSuspense(DiscountPageAsync, <DiscountPageLoader />)