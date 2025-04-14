import cls from './Cart.module.scss'
import { CounterInput } from '@/shared/ui'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { currencyFormat } from '@/shared/libs'
import { CartItemType } from '@/entities/Cart'

interface CartItemProps extends Omit<CartItemType, 'id'>{
  className?: string
  readonly?: boolean
  type?: 'mobile' | 'desktop'
}

const MobileCartItem = ({
  image,
  title,
  price,
  total,
  quantity,
  readonly = false
}: CartItemProps)=>  {
  const { t } = useTranslation('cart')
  return (
    <div className={cls.cartItemMobile}>
      <img src={image} alt={title} className={cls.cartImg}/>
      <div>
        <p className={classNames('cartTitle', cls.cartTitle)}>{title}</p>
        <p className={cls.cartPrice}>{t('price')}: {currencyFormat(price)}</p>
      </div>
      {readonly || (
        <div className={cls.gridCell}>
          <button className={cls.delete}>+</button>
        </div>
      )}

      {readonly
        ? <span className={cls.cartAmount}>{t('quantity')}: {quantity}</span>
        : <CounterInput  initialValue={quantity} className={cls.gridCell} />
      }
      <p className={cls.cartTotalPrice}>{t('total cost')}: {currencyFormat(total)}</p>
    </div>
  )
}

const DesktopCartItem = ({
  image,
  title,
  price,
  total,
  quantity,
  readonly = false
}: CartItemProps) => {
  return (
    <>
      <img src={image} alt={title} />
      <p className={'cartTitle'}>{title}</p>
      <p>{currencyFormat(price)}</p>
      {readonly ? <span>{quantity}</span> : <CounterInput initialValue={quantity}/>}
      <p>{currencyFormat(total)}</p>
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