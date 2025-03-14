import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const AdditionalServicePageAsync = lazy(() => import('./AdditionalServicePage.tsx'))
export const AdditionalServicePage = withSuspense(AdditionalServicePageAsync)