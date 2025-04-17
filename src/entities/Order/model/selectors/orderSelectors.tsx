import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'

export const getOrderPaymentSelector = (state: StateSchema) => state.order.payment
export const getOrderDeliverySelector = (state: StateSchema) => state.order.delivery