import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const CartPageAsync = lazy(() => import('./CartPage.tsx'))
export const CartPage = withSuspense(CartPageAsync)