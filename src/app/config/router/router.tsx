import { createBrowserRouter, Navigate } from 'react-router'
import { RootRouter } from './RootRouter.tsx'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'
import { HomePage } from '@/pages/Home/Home.async.tsx'
import { CatalogPages, CartPage, NotFound } from '@/pages'
import { TattooMachineDetails } from '@/pages'

export const router = createBrowserRouter([
  {
    path: RoutePaths.home,
    element: <RootRouter />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: RoutePaths.catalog,
        element: <CatalogPages />
      },
      {
        path: RoutePaths.tattoo_machine_details,
        element: <TattooMachineDetails />
      },
      {
        path: RoutePaths.cart,
        element: <CartPage />
      },
      {
        path: RoutePaths.not_found,
        element: <NotFound />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to={RoutePaths.not_found} />
  }
])