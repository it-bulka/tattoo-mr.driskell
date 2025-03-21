import { withSuspense } from '@/shared/libs'
import { lazy } from 'react'

const BrandPageAsync = lazy(() => import('./BrandPage.tsx'))
export const BrandPage = withSuspense(BrandPageAsync)
