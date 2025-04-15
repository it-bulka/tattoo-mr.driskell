import cls from './Cart.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { CartItem } from '@/entities/Cart/ui/Cart/CartItem.tsx'
import { CartItemType } from '@/entities/Cart'
import { useDevice } from '@/shared/libs'
import { cartActions } from '../../model/slice/cartSlice.tsx'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { useCallback } from 'react'

interface CartProps {
  className?: string
  items: CartItemType[]
  readonly?: boolean
}

export const Cart = ({
  className,
  items,
  readonly = false
}: CartProps) => {
  const { t } = useTranslation('cart')
  const isMobile = useDevice()
  const dispatch = useAppDispatch()

  const onQuantityChange = useCallback((arg: { id: string, quantity: number} ) => {
    dispatch(cartActions.setItemAmount(arg))
  }, [dispatch])

  const onDelete = useCallback((id: string ) => {
    dispatch(cartActions.removeItem(id))
  }, [dispatch])

  if(!items?.length) {
    return (
      <p>
        {t('no cart products')}
      </p>
    )
  }

  return (
    <div className={classNames(cls.gridTable, {[cls.readOnly]: readonly}, [className])}>
      <p className={classNames(cls.gridHeader, cls.nameHeader)}>{t('name')}</p>
      <p className={cls.gridHeader}>{t('price')}</p>
      <p className={cls.gridHeader}>{t('quantity')}</p>
      <p className={classNames(cls.gridHeader, cls.totalHeader)}>{t('total cost')}</p>

      <div className={cls.decorator}>
        <div className="decorator full gray croppedPoligon" />
      </div>


      {items.map((item) => (
        <>
          <CartItem
            key={item.productId}
            {...item}
            readonly={readonly}
            type={isMobile ? 'mobile' : 'desktop'}
            onQuantityChange={(quantity) => {
              onQuantityChange({ id: item.productId, quantity })
            }}
            onDeleteClick={() => onDelete(item.productId)}
          />
          {isMobile && <div className={classNames("decorator static full croppedPoligon gray", cls.decorator)} />}
        </>
      ))}
    </div>
  )
}