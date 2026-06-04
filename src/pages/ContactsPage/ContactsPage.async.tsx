import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'

import { ContactsPageLoader } from './ContactsPageLoader'

const ContactsPageAsync = lazy(() => import('./ContactsPage.tsx'))
export const ContactsPage = withSuspense(ContactsPageAsync, <ContactsPageLoader />)