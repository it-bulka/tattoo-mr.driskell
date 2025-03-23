import cls from './FilterToolbar.module.scss'
import classNames from 'classnames'
import { FilterLevel } from '@/features'
import { Toggler, RangeInput, CustomSelect } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { useState, useMemo } from 'react'

interface FilterToolbarProps {
  className?: string
}

const sortOptions = [
  { value: 'popular', label: 'sort.popular' },
  { value: 'alphabetically', label: 'sort.alphabetically' },
  { value: 'cheap', label: 'sort.cheap' },
  { value: 'expensive', label: 'sort.expensive' }
]

const typeOptions = [
  { value: 'rotary', label: 'machine types.rotary' },
  { value: 'coil', label: 'machine types.coil' },
  { value: 'pen-style', label: 'machine types.pen-style' },
  { value: 'pneumatic', label: 'machine types.pneumatic' },
]

export const FilterToolbar = ({ className }: FilterToolbarProps) => {
  const { t } = useTranslation('catalog')
  const [range, setRange] = useState({ min: 0, max: 4400 })

  const sorts = useMemo(() => {
    return sortOptions.map((option) => ({ ...option, label: t(option.label) }))
  }, [t])

  const types = useMemo(() => {
    return typeOptions.map((option) => ({ ...option, label: t(option.label) }))
  }, [t])

  return (
    <div className={classNames(cls.FilterToolbar, {}, [className])}>
      <FilterLevel />
      <div className={cls.selectors}>
        <RangeInput
          min={range.min}
          max={range.max}
          label={t('price')}
          onChangeMin={(val) => setRange(prev => ({ ...prev, min: val }))}
          onChangeMax={(val) => setRange(prev => ({ ...prev, max: val }))}
        />

        <CustomSelect
          label={t('sort.title')}
          options={sorts}
          defaultValue={sorts[0]}
        />

        <Toggler label={t('available only')} name="available" />

        <CustomSelect
          label={t('machine types.title')}
          options={types}
          defaultValue={types[0]}
        />
      </div>
    </div>
  )
}