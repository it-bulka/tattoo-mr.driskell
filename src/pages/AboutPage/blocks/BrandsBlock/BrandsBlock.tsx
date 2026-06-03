import cls from './BrandsBlock.module.scss'
import { useTranslation } from 'react-i18next'
import { useGetBrandsQuery } from '@/entities/Brand'

export const BrandsBlock = () => {
  const { t, i18n } = useTranslation()
  const { data: brands = [] } = useGetBrandsQuery(i18n.language)
  const brandsWithImages = brands.filter(b => b.imgUrl)

  return (
    <section className={cls.brands}>
      <div className="container">
        <h4 className="blockTitle">{t('about_page.brands_title')}</h4>
        <div className={cls.grid}>
          {brandsWithImages.map((brand) => (
            <div key={brand.slug} className={cls.brandItem}>
              <img src={brand.imgUrl} alt={brand.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
