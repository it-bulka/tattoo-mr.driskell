import cls from './FilterToolbar.module.scss'
import classNames from 'classnames'
import { FilterLevel } from '@/features'
import { Toggler, RangeInput, CustomSelect } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { useState, useMemo } from 'react'
import { FilterMenu } from '../FilterMenu/FilterMenu.tsx'
import { sortOptions, typeOptions } from './model/types.ts'
import { useDevice } from '@/shared/libs'

interface FilterToolbarProps {
  className?: string
}

export const FilterToolbar = ({ className }: FilterToolbarProps) => {
  const { t } = useTranslation('catalog')
  const isTablet = useDevice(1200)
  const [range, setRange] = useState({ min: 0, max: 4400 })

  const sorts = useMemo(() => {
    return sortOptions.map((option) => ({ ...option, label: t(option.label) }))
  }, [t])

  const types = useMemo(() => {
    return typeOptions.map((option) => ({ ...option, label: t(option.label) }))
  }, [t])

  return (
    <div className={classNames(cls.filterToolbar, {}, [className])}>
      <FilterLevel />

      { isTablet
        ? <FilterMenu sorts={sorts} types={types} />
        : (
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
        )
      }
    </div>
  )
}