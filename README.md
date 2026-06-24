# Tattoo Shop — Frontend

SPA e-commerce store for tattoo supplies (tattoo machines, needles, inks, accessories, services). Targets Ukrainian and English-speaking audiences.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 5.7 (strict) | Type safety |
| Vite | 6 | Build tool & dev server |
| Redux Toolkit + RTK Query | 2.6 | State management & API |
| React Router | 7.2 | Routing |
| react-hook-form + zod | 7.55 / 3.24 | Forms & validation |
| i18next | 24 | Internationalization (uk / en) |
| SCSS Modules | — | Component styling |
| Framer Motion | 12 | Animations |
| Swiper | 11 | Sliders / carousels |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Bundle analysis
npm run analyze
```

### Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_BASE_API_URL` | Backend API URL | `http://localhost:3000/api/v1` |

> `.env.production` must be configured before deployment.

## Architecture

The project follows the **Feature-Sliced Design (FSD)** methodology:

```
src/
├── app/          — initialization, providers, router, global styles
├── entities/     — business entities (Cart, User, Product, Order, Session)
├── features/     — user scenarios (auth, search, favourites, cart)
├── pages/        — pages (lazy-loaded)
├── widgets/      — complex UI blocks (NavBar, FilterMenu, Catalog)
└── shared/       — common: ui/, api/, libs/, config/, layouts/
```

Imports flow top-down only. Alias: `@/` → `src/`.

More details: **[Project Architecture](docs/architecture.md)**

## Main Pages

| Page | Path |
|---|---|
| Home | `/` |
| Catalog | `/catalog` |
| Category (tattoo machines) | `/catalog/tattoo-machines` |
| Product Details | `/catalog/tattoo-machines/:slug` |
| Brands | `/brands` |
| Brand | `/brands/:slug` |
| Cart | `/catalog/cart` |
| Additional Services | `/catalog/cart/additional-service` |
| Search | `/search` |
| Profile | `/profile` |
| Favourites | `/profile/favorites` |
| Promo Codes | `/promo-codes` |
| Discounts | `/discounts` |
| Help | `/help` |
| Contacts | `/contacts` |
| About | `/about` |

## Features

- **Catalog** — categories, brands, price filtering, pagination
- **Search** — debounced search with dropdown results
- **Cart** — backend sync, promo codes, checkout flow
- **Auth** — registration, login, email verification, password reset
- **Favourites** — likes persisted in localStorage
- **Profile** — personal data, order history
- **i18n** — Ukrainian (default) and English
- **Responsive** — adaptive layout via useDevice hook

## Deployment

Configured for **Netlify** deployment (`netlify.toml`). SPA fallback to `index.html` is already set up.

```bash
npm run build   # → dist/
```

## Documentation

| Document | Description |
|---|---|
| [Architecture](docs/architecture.md) | FSD structure, layers, state management, API layer |
| [UI Components](docs/ui-components.md) | Shared UI library (~45 components) |
| [Internationalization](docs/i18n.md) | Language setup, namespaces, adding translations |
