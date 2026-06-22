import cls from './ResetFilters.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'

interface ResetFiltersProps {
  className?: string
  disabled?: boolean
  onReset: () => void
}

export const ResetFilters = memo(({ className, disabled = false, onReset }: ResetFiltersProps) => {
  const { t } = useTranslation('catalog')

  return (
    <button
      type="button"
      className={classNames(cls.resetBtn, { [cls.disabled]: disabled }, [className])}
      onClick={onReset}
      disabled={disabled}
    >
      {t('reset filters')}
    </button>
  )
})

ResetFilters.displayName = 'ResetFilters'
