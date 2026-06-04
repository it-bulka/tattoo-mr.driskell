import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

import { ToolsBlogPageLoader } from './ToolsBlogPageLoader'

const ToolsBlogAsync = lazy(() => import('./ToolsBlog.tsx'))
export const ToolsBlog = withSuspense(ToolsBlogAsync, <ToolsBlogPageLoader />)