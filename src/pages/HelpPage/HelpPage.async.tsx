import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const HelpPageAsync = lazy(() => import('./HelpPage'))
export const HelpPage = withSuspense(HelpPageAsync)
