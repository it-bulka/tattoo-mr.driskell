import { Search } from '@/shared/ui'
import { useSearchParams } from 'react-router'
import { useCallback, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'
import { type OptionType, CustomOption } from './CustomOption/CustomOption.tsx'
import { useTranslation } from 'react-i18next'
import {
  useDebouncedSearchedProducts
} from '../utils/useDebouncedSearchedProducts/useDebouncedSearchedProducts.tsx';
import {
  useNavigateToTattooMachinePage
} from '../utils/useNavigateToTattooMachinePage/useNavigateToTattooMachinePage.tsx'

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

  const handleSelectChange = (selectedOption: SingleValue<OptionType>) => {
    if (!selectedOption) return
    goToProductPage(selectedOption.id)
  }

  const handleEmptyMessage = useCallback(() => {
    return search.trim().length <= 2
      ? t('write more that 2 characters')
      : t('nothing is found')
  }, [t, search])

  const onSearchChange = (val: string) => {
    setUrlSearchParams({ search: val.trim() })

    if(val === '' && data?.data.length) {
      clearLastRequestData()
    }
  }

  return (
    <div className={className}>
      <Search
        defaultValue={search}
        onChange={onSearchChange}
        isLoading={isFetching}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        withClearBtn={!!search}
        onClear={clearLastRequestData}
      />

      <Select<Product>
        options={data?.data || []}
        value={null}
        onChange={handleSelectChange}
        noOptionsMessage={handleEmptyMessage}
        components={{
          Control: () => null,
          Input: () => null,
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          Placeholder: () => null,
          SingleValue: () => null,
          Option: CustomOption
        }}
        getOptionLabel={(e) => e.title}
        getOptionValue={(e) => e.id}
        menuIsOpen={isFocused && !!data?.data && search.length > 0}
      />
    </div>

  )
}