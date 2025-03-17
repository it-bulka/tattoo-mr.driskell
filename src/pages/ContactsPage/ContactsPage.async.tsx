import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

const ContactsPageAsync = lazy(() => import('./ContactsPage.tsx'))
export const ContactsPage = withSuspense(ContactsPageAsync)