import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

import { HelpPageLoader } from './HelpPageLoader'

const HelpPageAsync = lazy(() => import('./HelpPage'))
export const HelpPage = withSuspense(HelpPageAsync, <HelpPageLoader />)
