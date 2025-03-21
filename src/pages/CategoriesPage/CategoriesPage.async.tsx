import { withSuspense } from '@/shared/libs'
import { lazy } from 'react'

const CategoriesPagesAsync = lazy(() => import('./CategoriesPage.tsx'))
export const CategoriesPages = withSuspense(CategoriesPagesAsync)
