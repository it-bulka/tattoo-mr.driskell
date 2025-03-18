import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const ToolsBlogAsync = lazy(() => import('./ToolsBlog.tsx'))
export const ToolsBlog = withSuspense(ToolsBlogAsync)