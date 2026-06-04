import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'
import { AdditionalServicePageLoader } from './AdditionalServicePageLoader'

const AdditionalServicePageAsync = lazy(() => import('./AdditionalServicePage.tsx'))
export const AdditionalServicePage = withSuspense(AdditionalServicePageAsync, <AdditionalServicePageLoader />)