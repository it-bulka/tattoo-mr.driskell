import cls from './DiscountPage.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { ProductList } from '@/entities'
import { productsList } from '@/mockData.tsx'
import { Breadcrumbs, Button, FilterButton } from '@/shared/ui';

interface DiscountPageProps {
  className?: string
}

const filters = ['tattoo holders', 'tattoo machines', 'tattoo inks', 'consumables' ]
const DiscountPage = ({ className }: DiscountPageProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.discountPage, 'container', {}, [className])}>
      <Breadcrumbs />
      <h3 className={classNames("pageTitle", cls.title)}>{t('discounts')}</h3>
      <div className={cls.filters}>
        {filters.map((category) => (
          <FilterButton key={category}>{t(category)}</FilterButton>
        ))}
      </div>
      <ProductList className={cls.products} products={productsList} />
      <Button center big>{t('see more')}</Button>
    </div>
  )
}

export default DiscountPage