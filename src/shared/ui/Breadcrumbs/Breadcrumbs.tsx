import cls from './Breadcrumbs.module.scss'
import classNames from 'classnames'
import { useLocation } from 'react-router'
import { useMemo } from 'react';
import { AppLink } from '../AppLink/AppLink.tsx'

interface BreadcrumbsProps {
  className?: string
}
export const Breadcrumbs = ({ className }: BreadcrumbsProps) => {
  const { pathname } = useLocation()

  const crumbs = useMemo(() => {
    return pathname.split('/').filter(Boolean)
  }, [pathname])
  
  return (
    <div className={classNames(cls.breadcrumbs, {}, [className])}>
      <AppLink to={'/'}>Головна</AppLink>
      <span>/</span>

      {crumbs.map((crumb, index) => {
        if (index === crumbs.length - 1) {
          return <p className={cls.active}>{crumb}</p>
        }

        return (
          <>
            <AppLink to={'/'}>{crumb}</AppLink>
            <span>/</span>
          </>
        )
      })}
    </div>
  )
}