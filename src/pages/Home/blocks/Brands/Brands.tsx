import cls from './Brands.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { getBrandsPage } from '@/shared/config/routeConfig/routeConfig.tsx'
import { BrandsSlider } from './BrandsSlider.tsx'

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

      <BrandsSlider />
    </>
  )
}
