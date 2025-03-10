export enum AppRoutes {
  // general
  HOME = 'home',
  PROFILE = 'profile',
  LIKE_COUNT = 'like_count',
  CART = 'cart',
  PROMO_CODES = 'promo_codes',
  DISCOUNTS = 'discounts',
  HELP = 'help',
  ABOUT = 'about',
  CONTACTS = 'contacts',
  // CATALOGS
  CATALOG = 'catalog',
  // additional
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found'
}

export const getHomePage = () => '/'
export const getProfilePage = () => '/profile'
export const getLikeCountPage = () => '/profile/like-count'
export const getCartPage = () => '/catalog/cart'
export const getPromoCodesPage = () => '/promo-codes'
export const getDiscountsPage = () => '/discounts'
export const getHelpPage = () => '/help'
export const getAboutPage = () => '/about'
export const getContactsPage = () => '/contacts'

// CATALOG PAGES
export const getCatalogPage = (slug: string) => `/catalog/${slug}`

export const getForbiddenPage = () => '/forbidden'
export const getNotFoundPage = () => '/not_found'

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: getHomePage(),
  [AppRoutes.PROFILE]: getProfilePage(),
  [AppRoutes.LIKE_COUNT]: getLikeCountPage(),
  [AppRoutes.CART]: getCartPage(),
  [AppRoutes.PROMO_CODES]: getPromoCodesPage(),
  [AppRoutes.DISCOUNTS]: getDiscountsPage(),
  [AppRoutes.HELP]: getHelpPage(),
  [AppRoutes.ABOUT]: getAboutPage(),
  [AppRoutes.CONTACTS]: getContactsPage(),
  // CATALOGS
  [AppRoutes.CATALOG]: getCatalogPage(':slug'),
  // ADDITIONAL
  [AppRoutes.FORBIDDEN]: getForbiddenPage(),
  [AppRoutes.NOT_FOUND]: getNotFoundPage(),
}

export type RoutePathsType = typeof RoutePaths[keyof typeof RoutePaths]