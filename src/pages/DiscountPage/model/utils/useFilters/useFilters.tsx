import { useSearchParams } from 'react-router'
import { useState, useEffect, useCallback } from 'react'
import { ProductCategory } from '@/entities'

const useFilters = (trigger: any, limit: number) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeFilters, setActiveFilters] = useState<ProductCategory[]>([])
  const [isParamsChecked, setIsParamsChecked] = useState(false)

  useEffect(() => {
    const currentCategories = searchParams.getAll('category') as ProductCategory[]
    setActiveFilters(currentCategories)
    setIsParamsChecked(true)
  }, [searchParams])

  const handleFilterClick = useCallback((categoryId: ProductCategory) => {
    const currentCategories = searchParams.getAll('category') as ProductCategory[]

    if (currentCategories.includes(categoryId)) {
      currentCategories.splice(currentCategories.indexOf(categoryId), 1)
    } else {
      currentCategories.push(categoryId)
    }

    setSearchParams({ category: currentCategories })
    setActiveFilters(currentCategories)

    trigger({
      page: 1,
      limit: limit,
      category: currentCategories
    })
  }, [searchParams, setSearchParams, trigger, limit])

  useEffect(() => {
    if (!isParamsChecked) return
    trigger({
      page: 1,
      limit: limit,
      category: activeFilters
    })
  }, [trigger, limit, activeFilters, isParamsChecked])

  return { activeFilters, handleFilterClick }
}

export default useFilters
