import cls from './OrderHistory.module.scss'
import classNames from 'classnames'
import { OrderHistoryItem } from './OrderHistoryItem/OrderHistoryItem.tsx'
import { OrderInfo } from './OrderInfo/OrderInfo.tsx'
import { memo, useCallback, useState } from 'react'
import { OrderContent } from './OrderContent/OrderContent.tsx'
import { OpenBtn } from './OpenBtn/OpenBtn.tsx'
import { OrderHistoryItemProps } from '@/entities/Order'

interface OrderHistoryProps extends OrderHistoryItemProps {
  className?: string
}

export const OrderHistory = memo(({
  className,
  date,
  orderNumber,
  quantity,
  totalCost,
  status,
  fullName,
  address,
  phone,
  email,
}: OrderHistoryProps) => {
  const [isOpened, setOpened] = useState(false)

  const toggle = useCallback(() => {
    setOpened(prev => !prev)
  }, [])

  return (
    <div className={classNames(cls.history, {}, [className])}>
      <OrderHistoryItem
        date={date}
        orderNumber={orderNumber}
        quantity={quantity}
        totalCost={totalCost}
        status={status}
        onBtnClick={toggle}
        isUp={isOpened}
      />

      <div className={classNames(cls.details, { [cls.opened]: isOpened })}>
        <div className="decorator gray full static croppedPoligon"/>
        <OrderInfo
          date={date}
          orderNumber={orderNumber}
          totalCost={totalCost}
          fullName={fullName}
          address={address}
          phone={phone}
          email={email}
        />

        <OrderContent />
        <OpenBtn onClick={toggle} switchText={isOpened} />
      </div>

      {/* Doubled for smoother animation*/}
      <OpenBtn onClick={toggle} switchText={isOpened} toHide={isOpened}/>
    </div>
  )
})

OrderHistory.displayName = 'OrderHistory'
