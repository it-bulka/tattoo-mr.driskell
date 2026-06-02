import { useState, useCallback, useMemo } from 'react'
import {
  FilterState,
  FilterApiParams,
  QuickFilterTag,
  Sorts,
  Types,
  NeedleTypes,
  initialFilterState,
  PRICE_MAX_DEFAULT,
} from './types'

const buildApiParams = (state: FilterState): FilterApiParams => {
  const params: FilterApiParams = {}

  if (state.tags.length)       params.tags      = state.tags.join(',')
  if (state.sort !== 'popular') params.sort      = state.sort
  if (state.minPrice > 0)      params.minPrice  = state.minPrice
  if (state.maxPrice < PRICE_MAX_DEFAULT) params.maxPrice = state.maxPrice
  if (state.inStock)           params.inStock   = true
  if (state.motorTypes.length) params.motorType = state.motorTypes.join(',')
  if (state.needleTypes.length) params.needleType = state.needleTypes.join(',')

  return params
}

export const useProductFilters = () => {
  const [state, setState] = useState<FilterState>(initialFilterState)

  const handleTagsChange = useCallback((tags: QuickFilterTag[]) => {
    setState(s => ({ ...s, tags }))
  }, [])

  const handleSortChange = useCallback((sort: Sorts) => {
    setState(s => ({ ...s, sort }))
  }, [])

  const handlePriceChange = useCallback((min: number, max: number) => {
    setState(s => ({ ...s, minPrice: min, maxPrice: max }))
  }, [])

  const handleInStockChange = useCallback((inStock: boolean) => {
    setState(s => ({ ...s, inStock }))
  }, [])

  const handleMotorTypesChange = useCallback((motorTypes: Types[]) => {
    setState(s => ({ ...s, motorTypes }))
  }, [])

  const handleNeedleTypesChange = useCallback((needleTypes: NeedleTypes[]) => {
    setState(s => ({ ...s, needleTypes }))
  }, [])

  const handlers = useMemo(() => ({
    handleTagsChange,
    handleSortChange,
    handlePriceChange,
    handleInStockChange,
    handleMotorTypesChange,
    handleNeedleTypesChange,
  }), [
    handleTagsChange,
    handleSortChange,
    handlePriceChange,
    handleInStockChange,
    handleMotorTypesChange,
    handleNeedleTypesChange,
  ])

  const apiParams = useMemo(() => buildApiParams(state), [state])

  return { filterState: state, handlers, apiParams }
}

export type FilterHandlers = ReturnType<typeof useProductFilters>['handlers']
