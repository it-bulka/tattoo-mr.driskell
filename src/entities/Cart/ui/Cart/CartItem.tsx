import cls from './Cart.module.scss'
import { CounterInput } from '@/shared/ui'
import { memo } from 'react';
import classNames from 'classnames';

export type CartItemType = {
  img: string
  title: string
  price: number
  totalPrice?: number
  amount: number
  id: string | number
}

interface CartItemProps extends Omit<CartItemType, 'id'>{
  className?: string
  readonly?: boolean
}

export const CartItem = memo(({
  img,
  title,
  price,
  totalPrice,
  amount,
  readonly = false
}: CartItemProps) => {
  return (
    <>
      <img src={img} alt={title} className={cls.gridCell}/>
      <p className={classNames(cls.gridCell, 'cartTitle')}>{title}</p>
      <p className={cls.gridCell}>{price}</p>
      {readonly ? <span>{amount}</span> : <CounterInput  className={cls.gridCell} />}
      <p className={cls.gridCell}>{totalPrice}</p>
      {readonly || (
        <div className={cls.gridCell}>
          <button className={cls.delete}>+</button>
        </div>
      )}
    </>
  )
})

CartItem.displayName = 'CartItem'