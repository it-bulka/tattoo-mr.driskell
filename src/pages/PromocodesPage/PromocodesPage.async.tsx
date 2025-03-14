import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'


const PromocodesPageAsync = lazy(() => import('./PromocodesPage.tsx'))

export const PromocodesPage = withSuspense(PromocodesPageAsync)