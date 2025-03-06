import cls from './Catalog.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { CatalogTabs } from '@/features'
import { useState, useCallback } from 'react'

interface CatalogProps {
  className?: string
}
export const Catalog = ({ className }: CatalogProps) => {
  const { t } = useTranslation()
  const [isShown, setShown] = useState(false)

  const onClick = useCallback(() => {
    setShown(prev => !prev)
  }, [setShown])

  return (
    <button className={classNames(cls.catalog, {}, [className])} onClick={onClick}>
      <span>{t('catalog')}</span>
      <div className={cls.burger}>
        <span />
        <span />
        <span />
      </div>

      <CatalogTabs isShown={isShown} onUnderlayClick={() => setShown(false)}/>
    </button>
  )
}