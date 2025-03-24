import cls from './FilterMenu.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import FilterIcon from '@/shared/assets/general/filter.svg?react'
import { FilterModal, FilterModalProps } from './FilterModal/FilterModal.tsx'
import { useState, memo } from 'react'

interface FilterMenuProps extends FilterModalProps {
  className?: string
}

export const FilterMenu = memo(({
  className,
  sorts,
  types
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
        types={types}
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
      />
    </div>
  )
})

FilterMenu.displayName = 'FilterMenu'