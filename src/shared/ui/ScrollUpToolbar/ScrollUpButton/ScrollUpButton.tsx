import cls from './ScrollUpButton.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import ArrowLeft from '@/shared/assets/general/arrow-left.svg?react'
import { memo } from 'react'

interface ScrollUpButtonProps {
  className?: string
}
export const ScrollUpButton = memo(({ className }: ScrollUpButtonProps) => {
  const { t } = useTranslation()

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <button className={classNames(cls.btn, {}, [className])} onClick={onClick}>
      <span>{t('to top')}</span>
      <span className={cls.arrow}>
        <ArrowLeft />
      </span>
    </button>
  )
})