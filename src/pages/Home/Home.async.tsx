import { lazy, FC } from 'react'
import { withSuspense } from '@/shared/libs'

const HomeAsync: FC = lazy(() => import('./Home'))
export const HomePage = withSuspense(HomeAsync)