import cls from './FilterLevel.module.scss'
import classNames from 'classnames'
import { FilterButton } from '@/shared/ui/FilterButton/FilterButton.tsx'
import { memo } from 'react'

interface FilterLevelOption {
  value: string
  label: string
}

interface FilterLevelProps {
  className?: string
  options: FilterLevelOption[]
  selectedValues: string[]
  onSelectionChange: (values: string[]) => void
}

export const FilterLevel = memo(({ className, options, selectedValues, onSelectionChange }: FilterLevelProps) => {
  const handleClick = (value: string) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value]
    onSelectionChange(next)
  }

  return (
    <div className={classNames(cls.filters, {}, [className])}>
      {options.map(({ value, label }) => (
        <FilterButton
          key={value}
          isActive={selectedValues.includes(value)}
          onClick={() => handleClick(value)}
        >
          {label}
        </FilterButton>
      ))}
    </div>
  )
})

FilterLevel.displayName = 'FilterLevel'
