import { DeliveryType } from '@/entities/Order'
import { OrderItemObj, OrderList } from '../types/general.tsx'

export const deliveries: OrderItemObj<DeliveryType, 'delivery'>  = {
  courier: {
    name: 'delivery',
    value: 'courier',
    label: 'delivery.courier service.title',
    info: 'delivery.courier service.info',
  },
  novaPoshta: {
    name: 'delivery',
    value: 'novaPoshta',
    label: 'delivery.nova poshta.title',
    info: 'delivery.nova poshta.info',
  }
}

export const deliveryList: OrderList<DeliveryType, 'delivery'> = Object.values(deliveries)