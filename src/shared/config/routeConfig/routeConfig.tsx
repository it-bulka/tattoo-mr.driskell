export enum AppRoutes {
  // general
  HOME = 'home',
  SEARCH = 'search_result',
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
  CATALOG_TATTOO_MACHINE = 'catalog_tattoo_machine',
  BRAND_TATTOO_MACHINE = 'brand',
  TATTOO_MACHINE_DETAILS = 'tattoo_machine_details',
  // additional
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found'
}

export const getHomePage = () => '/'
export const getSearchResultPage = () => '/search'
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
export const getCatalogTattooMachinesPage = () => `/catalog/tattoo-machines`
export const getCatalogBrandsPage = (slug: string) => `/brands/${slug}`
export const getCatalogDetailsPage = (slug: string) => `/catalog/${slug}`
export const getTattooMachineDetailsPage = (slug: string) => `/catalog/tattoo-machines/${slug}`

export const getForbiddenPage = () => '/forbidden'
export const getNotFoundPage = () => '/not-found'

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: getHomePage(),
  [AppRoutes.SEARCH]: getSearchResultPage(),
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
  [AppRoutes.CATALOG_TATTOO_MACHINE]: getCatalogTattooMachinesPage(),
  [AppRoutes.BRAND_TATTOO_MACHINE]: getCatalogBrandsPage(':slug'),
  [AppRoutes.TATTOO_MACHINE_DETAILS]: getTattooMachineDetailsPage(':slug'),
  // ADDITIONAL
  [AppRoutes.FORBIDDEN]: getForbiddenPage(),
  [AppRoutes.NOT_FOUND]: getNotFoundPage(),
}

export type RoutePathsType = typeof RoutePaths[keyof typeof RoutePaths]

export const PathsMapToTranslate: Record<string, string> = {
  'profile': 'profile',
  'favorites': 'favorites',
  'catalog': 'catalog',
  'cart': 'cart',
  'additional-service': 'additional-service',
  'promo-codes': 'promo codes',
  'discounts': 'discounts',
  'help': 'help',
  'tools': 'tools',
  'about': 'about',
  'contacts': 'contacts',
  'tattoo-machines': 'tattoo-machines',
  'brands': 'brands',
  'forbidden': 'forbidden',
  'not-found': 'not-found'
}