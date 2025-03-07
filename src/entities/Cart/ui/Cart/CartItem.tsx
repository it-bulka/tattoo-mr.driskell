import cls from './Cart.module.scss'
import { CounterInput } from '@/shared/ui'
import { memo } from 'react';

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
}

export const CartItem = memo(({
  img,
  title,
  price,
  totalPrice
}: CartItemProps) => {
  return (
    <>
      <img src={img} alt={title} className={cls.gridCell}/>
      <p className={cls.gridCell}>{title}</p>
      <p className={cls.gridCell}>{price}</p>
      <CounterInput  className={cls.gridCell} />
      <p className={cls.gridCell}>{totalPrice}</p>
      <div className={cls.gridCell}>
        <button className={cls.delete}>+</button>
      </div>
    </>
  )
})

CartItem.displayName = 'CartItem'