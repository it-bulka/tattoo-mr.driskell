import cls from './FilterMenu.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import FilterIcon from '@/shared/assets/general/filter.svg?react'
import { FilterModal } from './FilterModal/FilterModal.tsx'
import { useState, memo } from 'react'
import { FilterState, Option, Sorts } from '../FilterToolbar/model/types.ts'
import { FilterHandlers } from '../FilterToolbar/model/useProductFilters.ts'
import { ProductCategory } from '@/entities/ProductList'

interface FilterMenuProps {
  className?: string
  sorts: Option<Sorts>[]
  category: ProductCategory
  filterState: FilterState
  handlers: FilterHandlers
}

export const FilterMenu = memo(({
  className,
  sorts,
  category,
  filterState,
  handlers,
}: FilterMenuProps) => {
  const { t } = useTranslation('catalog')
  const [isModelOpen, setIsModelOpen] = useState(false)

  return (
    <div className={classNames(cls.filterMenu, {}, [className])}>
      <button className={cls.btn} onClick={() => setIsModelOpen(true)}>
        <FilterIcon />
        <span>{t('filter')}</span>
      </button>

      <FilterModal
        sorts={sorts}
        category={category}
        filterState={filterState}
        handlers={handlers}
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
      />
    </div>
  )
})

FilterMenu.displayName = 'FilterMenu'
