import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const ProfileAsync = lazy(() => import('./Profile.tsx'))
export const Profile = withSuspense(ProfileAsync)