export enum AppRoutes {
  HOME = 'home',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found'
}

export const getHomePage = () => '/'
export const getForbiddenPage = () => '/forbidden'
export const getNotFoundPage = () => '/not_found'

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: getHomePage(),
  [AppRoutes.FORBIDDEN]: getForbiddenPage(),
  [AppRoutes.NOT_FOUND]: getNotFoundPage(),
}