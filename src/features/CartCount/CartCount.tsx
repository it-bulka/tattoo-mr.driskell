import cls from './CartCount.module.scss'
import classNames from 'classnames'
import CartIcon from "@/shared/assets/general/cart.svg"
import { useCallback, memo } from 'react'
import { useNavigate } from 'react-router'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'
import { currencyFormat } from '@/shared/libs'
import { useSelector } from 'react-redux';
import { getTotalAmountSelector, getTotalPriceSelector } from '@/entities/Cart';

interface LikeCountProps {
  className?: string
}
export const CartCount = memo(({
  className
}: LikeCountProps) => {
  const navigate = useNavigate()
  const totalAmount = useSelector(getTotalAmountSelector)
  const totalPrice = useSelector(getTotalPriceSelector)

  const onClick =  useCallback(() => {
    navigate(RoutePaths.cart)
  }, [])
  return (
    <button
      className={classNames(cls.cartCount, {}, [className])}
      type="button"
      onClick={onClick}
    >
      {Boolean(totalPrice) && <span>{currencyFormat(totalPrice)}</span>}
      <CartIcon />
      {Boolean(totalAmount) && <span className={cls.amount}>{totalAmount}</span>}
    </button>
  )
})

CartCount.displayName = 'CartCount'