# Project Architecture

## Feature-Sliced Design (FSD)

The project follows the FSD methodology with the following layers (top to bottom):

```
app → pages → widgets → features → entities → shared
```

**Import rule**: a layer can only import from layers below it. For example, `features` can use `entities` and `shared`, but not `widgets` or `pages`.

### Layers

#### `app/`
Application initialization: providers (Store, i18n), router, global styles.

```
app/
├── App.tsx                — root component
├── AppInit.tsx            — startup initialization
├── config/router/         — React Router configuration
├── providers/StoreProvider/ — Redux store + types
└── styles/                — global SCSS (_vars, _mixins, _reset, _fonts)
```

#### `pages/`
23 pages, each lazy-loaded via `React.lazy()`. Every page has:
- `PageName.tsx` — main component
- `PageName.async.tsx` — lazy wrapper

Pages: Home, CatalogPage, CategoriesPage, TattooMachineDetails, BrandsPage, BrandPage, CartPage, AdditionalServicePage, SearchResultPage, FavouritesPage, Profile, DiscountPage, PromocodesPage, HelpPage, HelpDetailPage, ToolsBlog, ContactsPage, AboutPage, OrderSuccessPage, OrderFailurePage, VerifyEmailPage, ResetPasswordPage, NotFound.

#### `widgets/`
Complex UI blocks combining features and entities:
- **NavBar** — navigation bar with search
- **Catalog** — catalog container with tabs
- **FilterMenu** / **FilterToolbar** — product filtering
- **AdditionalCartInfo** — cart details
- **OrderHistory** — order history
- **MenuBtn** — mobile menu
- **ShareButton** — share button (react-share)

#### `features/`
User scenarios:

| Feature | Description |
|---|---|
| `auth` | Login, Register, ForgotPassword, VerifyEmail, ResetPassword (modals) |
| `addFavourite` | Likes — 3 slices + middleware + RTK Query endpoints |
| `searchTattooMachine` | Debounced search with dropdown results |
| `CartForm` | Checkout form (react-hook-form + zod) |
| `CartProductCounter` | Product quantity counter |
| `AddToCartBtn` / `AddToCartBtnWithCounter` | Add-to-cart buttons |
| `applyPromoCode` | Promo code activation |
| `ProfileForm` | Profile editing |
| `ChangePasswordForm` | Password change |
| `CatalogTabs` | Category / brand tabs |
| `FilterLevel` | Price filter (range input) |
| `LikeButton` / `LikeCount` | Like UI with counter |
| `AvatarBtn` | Avatar + dropdown menu |
| `ResetFilters` | Filter reset |

#### `entities/`
Business entities with types, slices, and UI:

| Entity | Description |
|---|---|
| `Cart` | Shopping cart — RTK entity adapter, sync middleware, promo codes |
| `User` | User profile (id, name, email, phone) |
| `Session` | Authenticated session state |
| `Order` | Order (statuses: pending / paid / cancelled / expired) |
| `ProductCard` | Product type + UI card |
| `ProductList` | Paginated product list |
| `ProductsSlider` | Product carousel (Swiper) |
| `ServiceCard` | Service card |
| `PersonalDataCard` / `PersonalDataCardMini` | Personal data card |
| `PromoCode` | Promo code |
| `Brand` | Brand |
| `Service` | Service |

#### `shared/`
Common code shared across all layers:
- `ui/` — UI component library (~45 components), see [UI Components](ui-components.md)
- `api/` — base RTK Query APIs (`rtkApi.ts`, `novaPoshtaApi.ts`)
- `libs/` — utilities (currencyFormat, useThrottle, getElementPosition, getLocal)
- `config/` — route config, i18n config
- `assets/` — images, SVG icons
- `layouts/` — layout components

---

## State Management

### Redux Store

Configuration: `src/app/providers/StoreProvider/config/store.ts`

```
StateSchema:
├── cart            — shopping cart state (entity adapter)
├── user            — user profile
├── auth            — auth state
├── order           — current order
├── search          — search state
├── favourites      — favourite products
├── session         — auth session
├── [rtkApi]        — RTK Query cache
└── [novaPoshtaApi] — Nova Poshta API cache
```

### Middleware

| Middleware | Purpose |
|---|---|
| `cartSyncMiddleware` | Automatically syncs cart with the backend on changes |
| `likedIdsMiddleware` | Persists liked product IDs in localStorage |

### RTK Query

The global `__IS_DEV__` flag enables Redux DevTools only in development mode.

---

## API Layer

**File**: `src/shared/api/rtkApi.ts`

- Base URL from the `VITE_BASE_API_URL` environment variable
- Headers included in every request:
  - `Accept-Language` — current language
  - `Authorization: Bearer <token>` — token from auth slice or localStorage
  - `Device-Id` — device identifier
- Endpoints are injected via `.injectEndpoints()` from each feature

A separate API exists for Nova Poshta: `src/shared/api/novaPoshtaApi.ts`.

---

## Routing

React Router 7.2 with `createBrowserRouter`.

Route configuration: `src/app/config/router/router.tsx`  
Enum and path helpers: `src/shared/config/routeConfig/routeConfig.tsx`

Private routes (require authentication):
- `/profile` — wrapped in `<PrivateRoute>`
- `/profile/favorites` — wrapped in `<PrivateRoute>`

---

## Styles

- **SCSS** with `sass-embedded`
- **CSS Modules** (`.module.scss`) for component style isolation
- Global mixins auto-injected via `vite.config.ts` → `additionalData`
- CSS variables: `src/app/styles/_vars.scss`
- SCSS mixins: `src/app/styles/_mixins.scss`
- The `@/` alias works in SCSS imports as well

---

## Build

Vite with manual chunk splitting (`manualChunks` in `vite.config.ts`):

| Chunk | Packages |
|---|---|
| `vendor-react` | react, react-dom, react-router |
| `vendor-redux` | @reduxjs/toolkit, react-redux |
| `vendor-motion` | framer-motion |
| `vendor-swiper` | swiper |
| `vendor-form` | react-hook-form, zod |
| `vendor-i18n` | i18next and plugins |
| `vendor-ui` | react-select, react-toastify |

Bundle analyzer: `npm run analyze` → opens `dist/stats.html`.
