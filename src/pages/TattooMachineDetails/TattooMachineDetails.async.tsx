import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const TattooMachineDetailsAsync = lazy(() => import('./TattooMachineDetails.tsx'))
export const TattooMachineDetails = withSuspense(TattooMachineDetailsAsync)