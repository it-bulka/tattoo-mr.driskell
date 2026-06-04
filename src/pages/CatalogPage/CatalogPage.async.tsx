import { withSuspense } from '@/shared/libs'
import { lazy } from 'react'
import { CatalogPageLoader } from './CatalogPageLoader'

const CatalogPageAsync = lazy(() => import('./CatalogPage.tsx'))
export const CatalogPage = withSuspense(CatalogPageAsync, <CatalogPageLoader />)
