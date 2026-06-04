import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

import { SearchResultPageLoader } from './SearchResultPageLoader'

const SearchResultPageLazy = lazy(() => import('./SearchResultPage.tsx'))
export const SearchResultPage = withSuspense(SearchResultPageLazy, <SearchResultPageLoader />)