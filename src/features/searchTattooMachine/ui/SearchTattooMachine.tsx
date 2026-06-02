import { Search } from '@/shared/ui'
import { useSearchParams } from 'react-router'
import { useCallback, useRef, useState } from 'react'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'
import { useTranslation } from 'react-i18next'
import {
  useDebouncedSearchedProducts
} from '../utils/useDebouncedSearchedProducts/useDebouncedSearchedProducts.tsx'
import {
  useNavigateToTattooMachinePage
} from '../utils/useNavigateToTattooMachinePage/useNavigateToTattooMachinePage.tsx'
import { SearchDropdown } from './SearchDropdown/SearchDropdown.tsx'

interface SearchTattooMachineProps {
  className?: string
}

export const SearchTattooMachine = ({ className }: SearchTattooMachineProps) => {
  const [UrlSearchParams, setUrlSearchParams] = useSearchParams()
  const search = UrlSearchParams.get('search') || ''
  const { data, isFetching, clearLastRequestData } = useDebouncedSearchedProducts(search)
  const goToProductPage = useNavigateToTattooMachinePage()
  const [isFocused, setFocused] = useState<boolean>(false)
  const { t } = useTranslation()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleSelect = useCallback((product: Product) => {
    goToProductPage(String(product.id))
    clearLastRequestData()
    setUrlSearchParams({})
    setFocused(false)
  }, [goToProductPage, clearLastRequestData, setUrlSearchParams])

  const onSearchChange = (val: string) => {
    setUrlSearchParams(val ? { search: val.trim() } : {})

    if (!val && data?.data.length) {
      clearLastRequestData()
    }
  }

  const isDropdownOpen = isFocused && search.length > 0 && data?.data !== undefined

  return (
    <div className={className} ref={wrapperRef}>
      <Search
        defaultValue={search}
        onChange={onSearchChange}
        isLoading={isFetching}
        onFocus={() => setFocused(true)}
        withClearBtn={!!search}
        onClear={() => {
          clearLastRequestData()
          setUrlSearchParams({})
        }}
        placeholder={t('search')}
      />

      <SearchDropdown
        items={data?.data || []}
        anchorRef={wrapperRef}
        isOpen={isDropdownOpen}
        onSelect={handleSelect}
        onClose={() => setFocused(false)}
        emptyMessage={t('nothing is found')}
      />
    </div>
  )
}
