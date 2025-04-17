import { DeliveryType, PaymentType } from '@/entities/Order';

export interface OrderTabItem<
  T extends PaymentType | DeliveryType,
  K extends string> {
  name: K,
  value: T,
  label: string,
  info: string
}

export type OrderItemObj<
  T extends PaymentType | DeliveryType,
  K extends string
> = Record<T, OrderTabItem<T, K>>

export type OrderList<
  T extends PaymentType | DeliveryType,
  K extends string
> = OrderTabItem<T, K>[]