import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const AboutPageAsync = lazy(() => import('./AboutPage'))
export const AboutPage = withSuspense(AboutPageAsync)
