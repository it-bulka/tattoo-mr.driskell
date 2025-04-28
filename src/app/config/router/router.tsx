import { createBrowserRouter, Navigate } from 'react-router'
import { RootRouter } from './RootRouter.tsx'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'
import { HomePage } from '@/pages/Home/Home.async.tsx'
import {
  CartPage, NotFound, DiscountPage, AdditionalServicePage,
  PromocodesPage, TattooMachineDetails, Profile, ContactsPage,
  ToolsBlog, BrandPage, CategoriesPages,
  SearchResultPage
} from '@/pages'

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
        path: RoutePaths.search_result,
        element: <SearchResultPage />
      },
      {
        path: RoutePaths.brand,
        element: <BrandPage />
      },
      {
        path: RoutePaths.catalog_tattoo_machine,
        element: <CategoriesPages />
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
        path: RoutePaths.additional_service,
        element: <AdditionalServicePage />
      },
      {
        path: RoutePaths.discounts,
        element: <DiscountPage />
      },
      {
        path: RoutePaths.promo_codes,
        element: <PromocodesPage />
      },
      {
        path: RoutePaths.profile,
        element: <Profile />
      },
      {
        path: RoutePaths.contacts,
        element: <ContactsPage />
      },
      {
        path: RoutePaths.help_tools,
        element: <ToolsBlog />
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