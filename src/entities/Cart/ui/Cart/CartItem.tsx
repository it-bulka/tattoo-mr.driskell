import cls from './Cart.module.scss'
import { CounterInput } from '@/shared/ui'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { currencyFormat } from '@/shared/libs'

export type CartItemType = {
  img: string
  title: string
  price: number
  totalPrice: number
  amount: number
  id: string | number
}

interface CartItemProps extends Omit<CartItemType, 'id'>{
  className?: string
  readonly?: boolean
  type?: 'mobile' | 'desktop'
}

const MobileCartItem = ({
  img,
  title,
  price,
  totalPrice,
  amount,
  readonly = false
}: CartItemProps)=>  {
  const { t } = useTranslation('cart')
  return (
    <div className={cls.cartItemMobile}>
      <img src={img} alt={title} className={cls.cartImg}/>
      <div>
        <p className={classNames('cartTitle', cls.cartTitle)}>{title}</p>
        <p className={cls.cartPrice}>{t('price')}: {currencyFormat(price)}</p>
      </div>
      {readonly || (
        <div className={cls.gridCell}>
          <button className={cls.delete}>+</button>
        </div>
      )}

      {readonly ? <span className={cls.cartAmount}>{t('quantity')}: {amount}</span> : <CounterInput  className={cls.gridCell} />}
      <p className={cls.cartTotalPrice}>{t('total cost')}: {currencyFormat(totalPrice)}</p>
    </div>
  )
}

const DesktopCartItem = ({
  img,
  title,
  price,
  totalPrice,
  amount,
  readonly = false
}: CartItemProps) => {
  return (
    <>
      <img src={img} alt={title} />
      <p className={'cartTitle'}>{title}</p>
      <p>{currencyFormat(price)}</p>
      {readonly ? <span>{amount}</span> : <CounterInput />}
      <p>{currencyFormat(totalPrice)}</p>
      {readonly || (
        <div>
          <button className={cls.delete}>
            <span>+</span>
          </button>
        </div>
      )}
    </>
  )
}
export const CartItem = memo(({
  type = 'desktop',
  readonly = false,
  ...props
}: CartItemProps) => {
  return (
    type === 'desktop' ? (
      <DesktopCartItem readonly={readonly} {...props} />
    ) : (
      <MobileCartItem readonly={readonly} {...props} />
    )
  )
})

CartItem.displayName = 'CartItem'