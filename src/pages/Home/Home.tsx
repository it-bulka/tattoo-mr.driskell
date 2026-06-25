import cls from './Home.module.scss'
import classNames from 'classnames'
import { Products } from './blocks/Products/Products.tsx'
import { Catalog } from './blocks/Catalog/Catalog.tsx'
import { Brands } from './blocks/Brands/Brands.tsx'
import { About } from './blocks/about/About.tsx'
import { Testimonials } from './blocks/Testimonials/Testimonials.tsx'
import { FormBlock } from './blocks/Form/FormBlock.tsx'
import { ErrorBoundary } from '@/shared/providers'
import { SeoMeta } from '@/shared/libs'
import { OrganizationSchema } from '@/shared/ui/SeoSchemas'

interface HomeProps {
  className?: string
}
const Home = ({ className }: HomeProps) => {
  return (
    <div className={classNames(cls.home, {}, [className, 'pageSpacing'])}>
      <SeoMeta
        title="Магазин тату-обладнання"
        description="Купити тату-машинки, голки, чорнило та аксесуари. Офіційні бренди, швидка доставка по Україні."
      />
      <OrganizationSchema />
      <ErrorBoundary><Products /></ErrorBoundary>
      <ErrorBoundary><Catalog /></ErrorBoundary>
      <ErrorBoundary><Brands /></ErrorBoundary>
      <ErrorBoundary><About /></ErrorBoundary>
      <ErrorBoundary><Testimonials /></ErrorBoundary>
      <ErrorBoundary><FormBlock /></ErrorBoundary>
    </div>
  )
}

export default Home