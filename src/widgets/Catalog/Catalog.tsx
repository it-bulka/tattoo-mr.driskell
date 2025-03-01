import cls from './Catalog.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

interface CatalogProps {
  className?: string
}
export const Catalog = ({ className }: CatalogProps) => {
  const { t } = useTranslation()

  return (
    <button className={classNames(cls.catalog, {}, [className])}>
      <span>{t('catalog')}</span>
      <div className={cls.burger}>
        <span />
        <span />
        <span />
      </div>
    </button>
  )
}