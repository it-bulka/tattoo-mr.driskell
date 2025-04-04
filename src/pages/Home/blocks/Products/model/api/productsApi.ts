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
  category?: ProductCategory
}

const productsApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query<ProductsType , SearchParams>({
      query: ({ page, limit, category }) => ({
        url: '/tattoo-machines',
        params: { page, limit, category }
      })
    }),
  })
})

export const { useGetProductsQuery } = productsApi