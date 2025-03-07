import cls from './CartPage.module.scss'
import classNames from 'classnames'
import { Breadcrumbs } from '@/shared/ui'
import { cartList } from '@/mockData.tsx'
import { Cart } from '@/entities/Cart'

interface CartPageProps {
  className?: string
}
const CartPage = ({ className }: CartPageProps) => {
  return (
    <div className={classNames(cls.cartPage, 'container', {}, [className])}>
      <Breadcrumbs />
      <h3 className={cls.title}></h3>
      <Cart items={cartList} />
    </div>
  )
}

export default CartPage