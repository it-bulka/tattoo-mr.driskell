import cls from './Brands.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { getBrandsPage } from '@/shared/config/routeConfig/routeConfig.tsx'
import { lazy, Suspense } from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'

const BrandsSlider = lazy(() =>
  import('./BrandsSlider.tsx').then(m => ({ default: m.BrandsSlider }))
)

export const Brands = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <div className={classNames(cls.header, 'container')}>
        <h3 className="pageTitle margin-0">{t('popular brands')}</h3>
        <button className={cls.link} onClick={() => navigate(getBrandsPage())}>
          {t('see all')}
        </button>
      </div>

      <Suspense fallback={<Skeleton height={200} variant="dark" />}>
        <BrandsSlider />
      </Suspense>
    </>
  )
}
