export { orderReducer, orderActions } from './model/slice/orderSlice.tsx'
export type { OrderSchema, PaymentType, DeliveryType, NPDeliverySubType, CourierShippingAddress, NPShippingAddress, OrderHistoryItemProps } from './model/types/orderSchema.tsx'
export {
  getOrderPaymentSelector,
  getOrderDeliverySelector,
  getSelectedServicesSelector,
} from './model/selectors/orderSelectors.tsx'
export { makeOrder } from './model/service/makeOrder.tsx'
export { useGetUserOrdersQuery } from './model/api/orderApi.tsx'