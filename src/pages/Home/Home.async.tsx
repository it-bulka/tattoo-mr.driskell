import { lazy, FC } from 'react'
import { withSuspense } from '@/shared/libs'
import { HomePageLoader } from './HomePageLoader'

const HomeAsync: FC = lazy(() => import('./Home'))
export const HomePage = withSuspense(HomeAsync, <HomePageLoader />)