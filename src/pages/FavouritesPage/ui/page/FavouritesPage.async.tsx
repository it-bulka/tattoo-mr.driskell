import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const FavouritesPageLazy = lazy(() => import('./FavouritesPage.tsx'))
export const FavouritesPage = withSuspense(FavouritesPageLazy)