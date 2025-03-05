import cls from './Brands.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { AppLink } from '@/shared/ui'
import { BrandsSlider } from './BrandsSlider.tsx'

interface BrandsProps {
  className?: string
}
export const Brands = ({ className }: BrandsProps) => {
  const { t } = useTranslation()
  
  return (
    <div className={classNames(cls.brands, {}, [className])}>
      <h3>{t('popular brands')}</h3>
      <AppLink to="/" className={cls.link}>{t('see all')}</AppLink>
      <BrandsSlider />
    </div>
  )
}