import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

import { ProfilePageLoader } from './ProfilePageLoader'

const ProfileAsync = lazy(() => import('./Profile.tsx'))
export const Profile = withSuspense(ProfileAsync, <ProfilePageLoader />)