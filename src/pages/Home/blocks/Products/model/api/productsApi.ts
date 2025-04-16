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
}

const productsApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query<ProductsType , SearchParams>({
      query: ({ page = 1, limit, category }) => {
        const categoryParam = Array.isArray(category) ? category.join(',') : category; // Якщо це масив, то об'єднуємо його в рядок через кому
        return {
          url: '/tattoo-machines',
          params: { page, limit, category: categoryParam }
        };
      },
    }),
  })
})

export const { useGetProductsQuery, useLazyGetProductsQuery } = productsApi