import { EntityState } from '@reduxjs/toolkit'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'

export interface LikesPageRequest {
  page: number
  limit: number
}

export interface LikedProductsRes {
  items: Product[]
  totalCount: number
  totalPages: number
  currentPage: number
}

export type LikedProductsSchema = EntityState<Product, string> & {
  totalCount: number
  totalPages: number
  currentPage: number
  itemsPerPage: number

  error: null | string
  isLoading: boolean
  _inited: boolean
}