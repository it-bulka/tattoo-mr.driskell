import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const DiscountPageAsync = lazy(() => import('./DiscountPage.tsx'))
export const DiscountPage = withSuspense(DiscountPageAsync)