import { withSuspense } from '@/shared/libs'
import { lazy } from 'react'
import { BrandPageLoader } from './BrandPageLoader'

const BrandPageAsync = lazy(() => import('./BrandPage.tsx'))
export const BrandPage = withSuspense(BrandPageAsync, <BrandPageLoader />)
