import { withSuspense } from '@/shared/libs'
import { lazy } from 'react'

const CatalogPagesAsync = lazy(() => import('./CatalogPages.tsx'))
export const CatalogPages = withSuspense(CatalogPagesAsync)
