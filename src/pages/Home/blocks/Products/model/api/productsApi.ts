import { rtkApi } from '@/shared/api/rtkApi.ts'
import type { Product } from '@/entities/ProductCard/ProductCard.tsx';
import { ProductCategory } from '@/entities'

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
  tags?: string
}

const productsApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query<ProductsType , SearchParams>({
      query: ({ page = 1, limit, category, tags }) => {
        const categoryParam = Array.isArray(category) ? category.join(',') : category;
        return {
          url: '/tattoo-machines',
          params: { page, limit, category: categoryParam, tags }
        };
      },
    }),
  })
})

export const { useGetProductsQuery, useLazyGetProductsQuery } = productsApi