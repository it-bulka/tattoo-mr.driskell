export enum AppRoutes {
  // general
  HOME = 'home',
  PROFILE = 'profile',
  FAVORITES = 'favorites',
  CART = 'cart',
  ADDITIONAL_SERVICE = 'additional_service',
  PROMO_CODES = 'promo_codes',
  DISCOUNTS = 'discounts',
  HELP = 'help',
  HELP_TOOLS = 'help_tools',
  ABOUT = 'about',
  CONTACTS = 'contacts',
  // CATALOGS
  CATALOG = 'catalog',
  CATALOG_DETAILS = 'catalog_details',
  TATTOO_MACHINE_DETAILS = 'tattoo_machine_details',
  // additional
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found'
}

export const getHomePage = () => '/'
export const getProfilePage = () => '/profile'
export const getFavoritesPage = () => '/profile/favorites'
export const getCartPage = () => '/catalog/cart'
export const getAdditionalServicePage = () => '/catalog/cart/additional-service'
export const getPromoCodesPage = () => '/promo-codes'
export const getDiscountsPage = () => '/discounts'
export const getHelpPage = () => '/help'
export const getHelpToolsPage = (slug: string) => `/help/tools/${slug}`
export const getAboutPage = () => '/about'
export const getContactsPage = () => '/contacts'

// CATALOG PAGES
export const getCatalogPage = () => `/catalog`
export const getCatalogDetailsPage = (slug: string) => `/catalog/${slug}`
export const getTattooMachineDetailsPage = (slug: string) => `/catalog/tattoo-machine/${slug}`

export const getForbiddenPage = () => '/forbidden'
export const getNotFoundPage = () => '/not-found'

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: getHomePage(),
  [AppRoutes.PROFILE]: getProfilePage(),
  [AppRoutes.FAVORITES]: getFavoritesPage(),
  [AppRoutes.CART]: getCartPage(),
  [AppRoutes.ADDITIONAL_SERVICE]: getAdditionalServicePage(),
  [AppRoutes.PROMO_CODES]: getPromoCodesPage(),
  [AppRoutes.DISCOUNTS]: getDiscountsPage(),
  [AppRoutes.HELP]: getHelpPage(),
  [AppRoutes.HELP_TOOLS]: getHelpToolsPage(':slug'),
  [AppRoutes.ABOUT]: getAboutPage(),
  [AppRoutes.CONTACTS]: getContactsPage(),
  // CATALOGS
  [AppRoutes.CATALOG]: getCatalogPage(),
  [AppRoutes.CATALOG_DETAILS]: getCatalogDetailsPage(':slug'),
  [AppRoutes.TATTOO_MACHINE_DETAILS]: getTattooMachineDetailsPage(':slug'),
  // ADDITIONAL
  [AppRoutes.FORBIDDEN]: getForbiddenPage(),
  [AppRoutes.NOT_FOUND]: getNotFoundPage(),
}

export type RoutePathsType = typeof RoutePaths[keyof typeof RoutePaths]