import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'
import { CartPageLoader } from './CartPageLoader'

const CartPageAsync = lazy(() => import('./CartPage.tsx'))
export const CartPage = withSuspense(CartPageAsync, <CartPageLoader />)