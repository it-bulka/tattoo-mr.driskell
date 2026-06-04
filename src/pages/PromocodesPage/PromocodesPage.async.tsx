import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'


import { PromocodesPageLoader } from './PromocodesPageLoader'

const PromocodesPageAsync = lazy(() => import('./PromocodesPage.tsx'))
export const PromocodesPage = withSuspense(PromocodesPageAsync, <PromocodesPageLoader />)