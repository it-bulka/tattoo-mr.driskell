import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'
import { AboutPageLoader } from './AboutPageLoader'

const AboutPageAsync = lazy(() => import('./AboutPage'))
export const AboutPage = withSuspense(AboutPageAsync, <AboutPageLoader />)
