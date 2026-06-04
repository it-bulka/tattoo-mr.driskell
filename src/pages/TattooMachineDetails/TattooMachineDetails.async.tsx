import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'
import { TattooMachineDetailsPageLoader } from './TattooMachineDetailsPageLoader'

const TattooMachineDetailsAsync = lazy(() => import('./TattooMachineDetails.tsx'))
export const TattooMachineDetails = withSuspense(TattooMachineDetailsAsync, <TattooMachineDetailsPageLoader />)