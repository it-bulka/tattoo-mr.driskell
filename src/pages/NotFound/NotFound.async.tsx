import { withSuspense } from '@/shared/libs'
import { lazy } from 'react'

const NotFoundAsync = lazy(() => import('./NotFound'))
export const NotFound = withSuspense(NotFoundAsync)