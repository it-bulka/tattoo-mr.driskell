import { withSuspense } from '@/shared/libs'
import { lazy } from 'react'

const BrandsPageAsync = lazy(() => import('./BrandsPage.tsx'))
export const BrandsPage = withSuspense(BrandsPageAsync)
