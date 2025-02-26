import { createBrowserRouter } from 'react-router'
import { RootRouter } from './RootRouter.tsx'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'
import { HomePage } from '@/pages/Home/Home.async.tsx'

export const router = createBrowserRouter([
  {
    path: RoutePaths.home,
    element: <RootRouter />,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  }
])