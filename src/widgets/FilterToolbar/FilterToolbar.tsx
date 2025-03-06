import cls from './FilterToolbar.module.scss'
import classNames from 'classnames'
import { FilterLevel } from '@/features'
import { Toggler } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { RangeInput } from '@/shared/ui'
import { useState } from 'react'

interface FilterToolbarProps {
  className?: string
}
export const FilterToolbar = ({ className }: FilterToolbarProps) => {
  const { t } = useTranslation('catalog')
  const [range, setRange] = useState({ min: 0, max: 4400 })

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
        <Toggler label={t('available only')} name="available" />
      </div>
    </div>
  )
}