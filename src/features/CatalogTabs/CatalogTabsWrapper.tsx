import cls from './CatalogTabs.module.scss'
import classNames from 'classnames'
import { CatalogTabs } from './CatalogTabs'
import { MouseEventHandler } from 'react';

interface CatalogTabsWrapperProps {
  className?: string
  isShown?: boolean
  onUnderlayClick?: () => void
}
export const CatalogTabsWrapper = ({ className, isShown, onUnderlayClick }: CatalogTabsWrapperProps) => {

  const underlayClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    console.log('underlayClickHandler')
    onUnderlayClick?.()
  }
  return (
    <>
      <div className={classNames(cls.underlay, { [cls.hidden]: !isShown })} onClick={underlayClickHandler}/>
      <div className={classNames(cls.wrapper, { [cls.shown]: isShown })} onClick={(e) => e.stopPropagation()}>
        <CatalogTabs className={className}/>
      </div>
    </>
  )
}