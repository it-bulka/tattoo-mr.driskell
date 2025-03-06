import cls from './FilterLevel.module.scss'
import classNames from 'classnames'
import { FilterButton } from '@/shared/ui/FilterButton/FilterButton.tsx'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next';


interface FilterLevelProps {
  className?: string
}
export const FilterLevel = memo(({ className }: FilterLevelProps) => {
  const { t } = useTranslation('catalog')

  const filters = useMemo(() => {
    return [
      { id: 0, name: t('filter-level.beginners') },
      { id: 1, name: t('filter-level.builders') },
      { id: 2, name: t('filter-level.professionals') },
      { id: 3, name: t('filter-level.consumables') },
    ]
  }, [t])
  return (
    <div className={classNames(cls.filters, {}, [className])}>
      {filters.map((filter) => (
        <FilterButton key={filter.id}>{filter.name}</FilterButton>
      ))}
    </div>
  )
})

FilterLevel.displayName = 'FilterLevel'