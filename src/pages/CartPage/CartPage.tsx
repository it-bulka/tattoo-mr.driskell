import cls from './CartPage.module.scss'
import classNames from 'classnames'
import { Breadcrumbs } from '@/shared/ui'
import { cartList } from '@/mockData.tsx'
import { Cart } from '@/entities/Cart'
import { CartForm } from './CartForm/CartForm.tsx'
import { AdditionalInfo } from './AdditionalInfo/AdditionalInfo.tsx'

interface CartPageProps {
  className?: string
}
const CartPage = ({ className }: CartPageProps) => {
  return (
    <div className={classNames(cls.cartPage, 'container', {}, [className])}>
      <Breadcrumbs />
      <h3 className={cls.title}></h3>
      <div className={cls.content}>
        <Cart items={cartList} className={cls.cart}/>
        <CartForm className={cls.form}/>
        <AdditionalInfo className={cls.additional}/>
      </div>
    </div>
  )
}

export default CartPage