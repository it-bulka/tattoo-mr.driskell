import { RouterProvider } from 'react-router';
import { router } from './config/router/router.tsx'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/shared/config/i18n/i18n.tsx';
import { Suspense } from 'react'
import { ErrorBoundary } from '@/shared/providers';
import { StoreProvider } from './providers/StoreProvider'
import AppInit from './AppInit.tsx'

export const App = () => {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <I18nextProvider i18n={i18n}>
          <AppInit />
          {/* TODO: add Page Loader */}
          <Suspense fallback={<div>Loading ...</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </I18nextProvider>
      </StoreProvider>
    </ErrorBoundary>
  )
}