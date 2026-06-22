import cls from './FilterToolbar.module.scss'
import classNames from 'classnames'
import { FilterLevel } from '@/features'
import { Toggler, RangeInput, CustomSelect } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { FilterMenu } from '../FilterMenu/FilterMenu.tsx'
import { sortOptions, QUICK_FILTER_TAGS, FilterState } from './model/types.ts'
import { FilterHandlers } from './model/useProductFilters.ts'
import { useDevice } from '@/shared/libs'
import { ProductCategory } from '@/entities/ProductList'

interface FilterToolbarProps {
  className?: string
  category?: ProductCategory
  filterState: FilterState
  handlers: FilterHandlers
  showQuickFilters?: boolean
}

export const FilterToolbar = ({ className, category, filterState, handlers, showQuickFilters = true }: FilterToolbarProps) => {
  const { t } = useTranslation('catalog')
  const isTablet = useDevice(1200)

  const sorts = useMemo(
    () => sortOptions.map((option) => ({ ...option, label: t(option.label) })),
    [t]
  )

  const quickFilterOptions = useMemo(
    () => QUICK_FILTER_TAGS.map(({ value, i18nKey }) => ({ value, label: t(i18nKey) })),
    [t]
  )

  return (
    <div className={classNames(cls.filterToolbar, {}, [className])}>
      {showQuickFilters && (
        <FilterLevel
          options={quickFilterOptions}
          selectedValues={filterState.tags}
          onSelectionChange={(vals) => handlers.handleTagsChange(vals as FilterState['tags'])}
        />
      )}

      {isTablet
        ? (
          <FilterMenu
            sorts={sorts}
            category={category}
            filterState={filterState}
            handlers={handlers}
          />
        )
        : (
          <div className={cls.selectors}>
            <RangeInput
              min={filterState.minPrice}
              max={filterState.maxPrice}
              label={t('price')}
              onChangeMin={(val) => handlers.handlePriceChange(val, filterState.maxPrice)}
              onChangeMax={(val) => handlers.handlePriceChange(filterState.minPrice, val)}
            />

            <CustomSelect
              label={t('sort.title')}
              options={sorts}
              defaultValue={sorts.find(s => s.value === filterState.sort) ?? sorts[0]}
              onChange={(opt) => {
                const selected = opt as { value: string } | null
                if (selected && !Array.isArray(selected)) {
                  handlers.handleSortChange(selected.value as FilterState['sort'])
                }
              }}
            />

            <Toggler
              label={t('available only')}
              name="available"
              isChecked={filterState.inStock}
              onChange={(e) => handlers.handleInStockChange((e.target as HTMLInputElement).checked)}
            />
          </div>
        )
      }
    </div>
  )
}
