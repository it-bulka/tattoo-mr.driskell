import cls from './ScrollUpButton.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import ArrowLeft from '@/shared/assets/general/arrow-left.svg?react'
import { memo } from 'react'

interface ScrollUpButtonProps {
  className?: string
  btnOnly?: boolean
}
export const ScrollUpButton = memo(({ className, btnOnly = false }: ScrollUpButtonProps) => {
  const { t } = useTranslation()

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <button className={classNames(cls.btn, {}, [className])} onClick={onClick}>
      {btnOnly || <span>{t('to top')}</span>}
      <span className={cls.arrow}>
        <ArrowLeft />
      </span>
    </button>
  )
})

ScrollUpButton.displayName = 'ScrollUpButton'