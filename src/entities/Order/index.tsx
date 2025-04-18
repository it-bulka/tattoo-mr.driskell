export { orderReducer, orderActions } from './model/slice/orderSlice.tsx'
export type { OrderSchema, PaymentType, DeliveryType } from './model/types/orderSchema.tsx'
export {
  getOrderPaymentSelector,
  getOrderDeliverySelector
} from './model/selectors/orderSelectors.tsx'
export { makeOrder } from './model/service/makeOrder.tsx'