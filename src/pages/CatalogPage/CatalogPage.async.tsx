import { withSuspense } from '@/shared/libs'
import { lazy } from 'react'

const CatalogPageAsync = lazy(() => import('./CatalogPage.tsx'))
export const CatalogPage = withSuspense(CatalogPageAsync)
