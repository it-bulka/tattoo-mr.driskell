import { withSuspense } from '@/shared/libs'
import { lazy } from 'react'
import { BrandsPageLoader } from './BrandsPageLoader'

const BrandsPageAsync = lazy(() => import('./BrandsPage.tsx'))
export const BrandsPage = withSuspense(BrandsPageAsync, <BrandsPageLoader />)
