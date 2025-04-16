import cls from './CartPage.module.scss'
import classNames from 'classnames'
import { Breadcrumbs } from '@/shared/ui'
import { Cart } from '@/entities/Cart'
import { CartForm } from '@/entities'
import { AdditionalCartInfo } from '@/widgets'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getCartItemsSelector } from '@/entities/Cart'

interface CartPageProps {
  className?: string
}
const CartPage = ({ className }: CartPageProps) => {
  const { t } = useTranslation('cart')
  const cartItems = useSelector(getCartItemsSelector)

  return (
    <div className={classNames(cls.cartPage, 'container', {}, [className])}>
      <Breadcrumbs />
      <h3 className="pageTitle">{t('cart')}</h3>
      <div className={cls.content}>
        <Cart items={cartItems} className={cls.cart}/>
        <CartForm className={cls.form}/>
        <AdditionalCartInfo className={cls.additional}/>
      </div>
    </div>
  )
}

export default CartPage