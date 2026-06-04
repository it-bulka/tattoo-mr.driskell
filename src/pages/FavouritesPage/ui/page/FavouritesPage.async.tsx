import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

import { FavouritesPageLoader } from './FavouritesPageLoader'

const FavouritesPageLazy = lazy(() => import('./FavouritesPage.tsx'))
export const FavouritesPage = withSuspense(FavouritesPageLazy, <FavouritesPageLoader />)