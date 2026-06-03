import { rtkApi } from '@/shared/api/rtkApi.ts'
import type { Product } from '@/entities/ProductCard/ProductCard.tsx'
import { ProductCategory, ProductLabel } from '../type/productSchema.ts'
import type { Sorts } from '@/widgets/FilterToolbar/model/types'

export interface ProductsType {
  currentPage: number
  machines: Product[]
  totalCount: number
  totalPages: number
}

type SearchParams = {
  page: number
  limit: number
  category?: ProductCategory | ProductCategory[]
  label?: ProductLabel | ProductLabel[]
  tags?: string
  sort?: Sorts
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  motorType?: string
  needleType?: string
  brandSlug?: string
  onlyDiscounted?: boolean
}

const buildQuery = (params: SearchParams) => {
  const { page = 1, limit, category, label, tags, sort, minPrice, maxPrice, inStock, motorType, needleType, brandSlug, onlyDiscounted } = params
  const categoryParam = Array.isArray(category) ? category.join(',') : category
  const labelParam = Array.isArray(label) ? label.join(',') : label
  return {
    url: '/tattoo-machines',
    params: { page, limit, category: categoryParam, label: labelParam, tags, sort, minPrice, maxPrice, inStock, motorType, needleType, brandSlug, onlyDiscounted }
  }
}

const productsApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query<ProductsType, SearchParams>({
      query: buildQuery,
    }),
    getProductsPaginated: build.query<ProductsType, SearchParams>({
      query: buildQuery,
      serializeQueryArgs: ({ queryArgs }) => {
        const { page: _page, ...rest } = queryArgs
        return rest
      },
      merge: (currentCache, newItems) => {
        if (newItems.currentPage === 1) {
          currentCache.machines = newItems.machines
        } else {
          currentCache.machines.push(...newItems.machines)
        }
        currentCache.currentPage = newItems.currentPage
        currentCache.totalPages = newItems.totalPages
        currentCache.totalCount = newItems.totalCount
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page,
    }),
  })
})

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductsPaginatedQuery,
} = productsApi
