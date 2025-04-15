import cls from './Cart.module.scss'

export const DeleteCartItemBtn = ({ onClick }: { onClick: () => void}) => {
  return  (
    <button className={cls.delete} onClick={onClick}>
      <span>+</span>
    </button>
  )
}