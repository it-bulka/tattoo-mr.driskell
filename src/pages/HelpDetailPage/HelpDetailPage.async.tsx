import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'
import { HelpDetailPageLoader } from './HelpDetailPageLoader'

const HelpDetailPageAsync = lazy(() => import('./HelpDetailPage'))
export const HelpDetailPage = withSuspense(HelpDetailPageAsync, <HelpDetailPageLoader />)
