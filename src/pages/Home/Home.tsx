import cls from './Home.module.scss'
import classNames from 'classnames'
import { Products } from './blocks/Products.tsx'
import { Catalog } from './blocks/Catalog/Catalog.tsx';


interface HomeProps {
  className?: string
}
const Home = ({ className }: HomeProps) => {
  return (
    <div className={classNames(cls.home, {}, [className])}>
      <Products />
      <Catalog />
    </div>
  )
}

export default Home