import { PaymentType } from '@/entities/Order'
import { OrderItemObj, OrderList } from '../types/general.tsx'

export const payments: OrderItemObj<PaymentType, 'payment'> = {
  online: {
    name: 'payment',
    value: 'online',
    label: 'payment.online payment.title',
    info: 'payment.online payment.info'
  },
  cashOnDelivery: {
    name: 'payment',
    value: 'cashOnDelivery',
    label: 'payment.cash on delivery.title',
    info: 'payment.cash on delivery.info'
  },
  bankTransfer: {
    name: 'payment',
    value: 'bankTransfer',
    label: 'payment.bank transfer.title',
    info: 'payment.bank transfer.info',
  }
}

export const paymentList: OrderList<PaymentType, 'payment'> = Object.values(payments)
