import { withSuspense } from '@/shared/libs'
import { lazy } from 'react'
import { CategoriesPageLoader } from './CategoriesPageLoader'

const CategoriesPagesAsync = lazy(() => import('./CategoriesPage.tsx'))
export const CategoriesPages = withSuspense(CategoriesPagesAsync, <CategoriesPageLoader />)
