import { rtkApi } from '@/shared/api/rtkApi.ts'
import { Order, OrderRes, OrderHistoryItemProps, OrderStatus } from '../types/orderSchema.tsx'

interface BackendOrder {
  _id: string
  orderDate: string
  totalPrice: number
  status: OrderStatus
  items: Array<{ quantity: number }>
  buyer?: { fullName?: string; phone?: string; email?: string }
  shippingAddress?: { city?: string; street?: string }
}

function mapOrderToHistoryItem(order: BackendOrder): OrderHistoryItemProps {
  return {
    date: new Date(order.orderDate),
    orderNumber: order._id,
    quantity: order.items.reduce((sum, item) => sum + item.quantity, 0),
    totalCost: order.totalPrice,
    status: order.status,
    fullName: order.buyer?.fullName ?? '',
    address: [order.shippingAddress?.city, order.shippingAddress?.street]
      .filter(Boolean).join(', '),
    phone: order.buyer?.phone ?? '',
    email: order.buyer?.email ?? '',
  }
}

export const orderApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    sendOrder: build.mutation<OrderRes, Order>({
      query: (order) => ({
        url: '/orders',
        body: order,
        method: 'POST',
      })
    }),
    getUserOrders: build.query<OrderHistoryItemProps[], string>({
      query: (userId) => `/users/${userId}/orders`,
      transformResponse: (res: { data: BackendOrder[] }) => res.data.map(mapOrderToHistoryItem),
      providesTags: (_, __, userId) => [{ type: 'UserOrders' as const, id: userId }],
    }),
  })
})

export const { useGetUserOrdersQuery } = orderApi
