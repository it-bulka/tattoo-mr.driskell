import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const SearchResultPageLazy = lazy(
  () => import('./SearchResultPage.tsx')
)

export const SearchResultPage = withSuspense(SearchResultPageLazy)