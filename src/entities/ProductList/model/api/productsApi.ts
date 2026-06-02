import { rtkApi } from '@/shared/api/rtkApi.ts'
import type { Product } from '@/entities/ProductCard/ProductCard.tsx'
import { ProductCategory, ProductLabel } from '../type/productSchema.ts'

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
}

const productsApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query<ProductsType, SearchParams>({
      query: ({ page = 1, limit, category, label, tags }) => {
        const categoryParam = Array.isArray(category) ? category.join(',') : category
        const labelParam = Array.isArray(label) ? label.join(',') : label
        return {
          url: '/tattoo-machines',
          params: { page, limit, category: categoryParam, label: labelParam, tags }
        }
      },
    }),
  })
})

export const { useGetProductsQuery, useLazyGetProductsQuery } = productsApi
