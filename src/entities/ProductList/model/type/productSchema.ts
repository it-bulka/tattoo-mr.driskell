import { Product } from '@/entities/ProductCard/ProductCard.tsx'
import { EntityState } from '@reduxjs/toolkit'

export type ProductCategory =
  'bestseller' | 'popular' | 'new' | 'sale' |
  // extended
  'tattoo-sets' | 'tattoo-machines' | 'tattoo-inks' | 'tattoo-needles' | 'tattoo-holders' |
  'tattoo-tips' | 'power-supplies' | 'pedals-and-wires' | 'accessories' | 'printers-and-tablets' | 'protection-containers-consumables'

export interface ProductsPageSchema extends EntityState<Product, string> {
  currentPage: number
  totalPages: number
  category?: ProductCategory
  isLoading?: boolean
  error?: string
}

export interface ProductsSchema {
  [key: string]: ProductsPageSchema
}