import cls from './CategoriesBlock.module.scss'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/Card/Card';
import { CardsGrid } from '@/shared/ui/CardsGrid/CardsGrid';
import { useNavigate } from 'react-router'
import { getCatalogPage } from '@/shared/config/routeConfig/routeConfig'

export const CategoriesBlock = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const categories = [
    {
      title: t('help_page.cat_delivery_title'),
      text: t('help_page.cat_delivery_text'),
      btnTitle: t('help_page.cat_delivery_btn'),
    },
    {
      title: t('help_page.cat_payment_title'),
      text: t('help_page.cat_payment_text'),
      btnTitle: t('help_page.cat_payment_btn'),
    },
    {
      title: t('help_page.cat_return_title'),
      text: t('help_page.cat_return_text'),
      btnTitle: t('help_page.cat_return_btn'),
    },
    {
      title: t('help_page.cat_warranty_title'),
      text: t('help_page.cat_warranty_text'),
      btnTitle: t('help_page.cat_warranty_btn'),
    },
    {
      title: t('help_page.cat_guide_title'),
      text: t('help_page.cat_guide_text'),
      btnTitle: t('help_page.cat_guide_btn'),
      onClick: () => navigate(getCatalogPage()),
    },
    {
      title: t('help_page.cat_order_title'),
      text: t('help_page.cat_order_text'),
      btnTitle: t('help_page.cat_order_btn'),
      onClick: () => navigate(getCatalogPage()),
    },
  ]

  return (
    <section className={cls.categories}>
      <div className="container">
        <h4 className="blockTitle">{t('help_page.categories_title')}</h4>
        <CardsGrid className={cls.grid}>
          {categories.map((cat) => (
            <Card
              key={cat.title}
              title={cat.title}
              btnTitle={cat.btnTitle}
              onBtnClick={cat.onClick}
            >
              <p className={cls.cardText}>{cat.text}</p>
            </Card>
          ))}
        </CardsGrid>
      </div>
    </section>
  )
}
