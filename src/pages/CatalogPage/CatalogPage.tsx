import cls from './CatalogPage.module.scss'
import classNames from 'classnames'

interface CatalogPageProps {
  className?: string
}
export const CatalogPage = ({ className }: CatalogPageProps) => {

  return (
    <div className={classNames(cls.CatalogPage, {}, [className])}>
      CatalogPage
    </div>
  )
}