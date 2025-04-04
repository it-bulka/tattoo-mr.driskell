import { Product } from '@/entities/ProductCard/ProductCard.tsx'

export type ProductCategory = 'bestseller' | 'popular' | 'new' | 'sale'

export interface ProductsSchema {
  [key: string]: {
    products: Product[]
    currentPage: number
    totalPages: number,
    category?: ProductCategory
    isLoading?: boolean
    error?: string
  }
}