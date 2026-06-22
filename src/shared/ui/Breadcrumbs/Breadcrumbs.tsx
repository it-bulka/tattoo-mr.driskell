import cls from './Breadcrumbs.module.scss'
import classNames from 'classnames'
import { useLocation } from 'react-router'
import { Fragment, useMemo } from 'react';
import { AppLink } from '../AppLink/AppLink.tsx'
import { useTranslation } from 'react-i18next'
import { PathsMapToTranslate } from '@/shared/config/routeConfig/routeConfig.tsx'

interface BreadcrumbsProps {
  className?: string
  customLastCrumb?: string
}
export const Breadcrumbs = ({ className, customLastCrumb }: BreadcrumbsProps) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  const crumbs = useMemo(() => {
    return pathname.split('/').filter(Boolean)
  }, [pathname])
  
  return (
    <div className={classNames(cls.breadcrumbs, {}, [className])}>
      <AppLink to={'/'}>{t('home')}</AppLink>
      <span>/</span>

      {crumbs.map((crumb, index) => {
        let mappedCrumb = PathsMapToTranslate[crumb]
        if (!mappedCrumb) mappedCrumb = crumb.replace(/-/g, ' ')

        if (index === crumbs.length - 1) {
          const c = customLastCrumb || t(mappedCrumb)
          return <p key={crumb} className={cls.active}>{c}</p>
        }

        const breadcrumbPath = '/' + crumbs.slice(0, index + 1).join('/')
        return (
          <Fragment key={crumb}>
            <AppLink to={breadcrumbPath}>{t(mappedCrumb)}</AppLink>
            <span>/</span>
          </Fragment>
        )
      })}
    </div>
  )
}