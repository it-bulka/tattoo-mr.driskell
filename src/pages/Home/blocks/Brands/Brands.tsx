import cls from './Brands.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { AppLink } from '@/shared/ui'
import { BrandsSlider } from './BrandsSlider.tsx'

export const Brands = () => {
  const { t } = useTranslation()
  
  return (
    <>
      <div className={classNames(cls.header, 'container')}>
        <h3 className="pageTitle margin-0">{t('popular brands')}</h3>
        <AppLink to="/" className={cls.link}>{t('see all')}</AppLink>
      </div>

      <BrandsSlider />
    </>
  )
}