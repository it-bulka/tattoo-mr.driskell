import { withSuspense } from '@/shared/libs'
import { lazy } from 'react'

import { NotFoundPageLoader } from './NotFoundPageLoader'

const NotFoundAsync = lazy(() => import('./NotFound'))
export const NotFound = withSuspense(NotFoundAsync, <NotFoundPageLoader />)