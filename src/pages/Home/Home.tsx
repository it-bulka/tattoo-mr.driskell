import cls from './Home.module.scss'
import classNames from 'classnames'
import { Products } from './blocks/Products/Products.tsx'
import { Catalog } from './blocks/Catalog/Catalog.tsx'
import { Brands } from './blocks/Brands/Brands.tsx'
import { About } from './blocks/about/About.tsx'
import { Testimonials } from './blocks/Testimonials/Testimonials.tsx'
import { FormBlock } from './blocks/Form/FormBlock.tsx'


interface HomeProps {
  className?: string
}
const Home = ({ className }: HomeProps) => {
  return (
    <div className={classNames(cls.home, {}, [className, 'pageSpacing'])}>
      <Products />
      <Catalog />
      <Brands />
      <About />
      <Testimonials />
      <FormBlock />
    </div>
  )
}

export default Home