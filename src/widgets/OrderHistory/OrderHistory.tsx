import cls from './OrderHistory.module.scss'
import classNames from 'classnames'
import { OrderHistoryItem } from './OrderHistoryItem/OrderHistoryItem.tsx'
import { OrderInfo } from './OrderInfo/OrderInfo.tsx'
import { memo, useCallback, useState } from 'react'
import { OrderContent } from './OrderContent/OrderContent.tsx'
import { OpenBtn } from './OpenBtn/OpenBtn.tsx'

interface OrderHistoryProps {
  className?: string
}
export const OrderHistory = memo(({ className }: OrderHistoryProps) => {
  const [isOpened, setOpened] = useState(false)

  const toggle = useCallback(() => {
    setOpened(prev => !prev)
  }, [setOpened])

  return (
    <div className={classNames(cls.history, {}, [className])}>
      <OrderHistoryItem
        date={new Date('02.10.2021, 20:56:40')}
        orderNumber="4564"
        quantity={17}
        totalCost={45645}
        status={'delivered'}
        onBtnClick={toggle}
        isUp={isOpened}
      />

      <div className={classNames(cls.details, { [cls.opened]: isOpened })}>
        <div className="decorator gray full static croppedPoligon"/>
        <OrderInfo
          date={new Date('02.10.2021, 20:56:40')}
          orderNumber="4564"
          totalCost={45645}
          fullName={'Петро Петрович Петриченко'}
          address={'м.Київб вул.Зелена, 15'}
          phone={'4564645464646'}
          email={'email.gmail.com'}
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