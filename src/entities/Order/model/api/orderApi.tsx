import { rtkApi } from '@/shared/api/rtkApi.ts'
import { Order, OrderRes, OrderHistoryItemProps, OrderStatus } from '../types/orderSchema.tsx'

interface CreateOrderRes {
  data: OrderRes
  success: boolean
}

interface BackendOrder {
  _id: string
  orderDate: string
  totalPrice: number
  status: OrderStatus
  items: Array<{ quantity: number }>
  buyer?: { fullName?: string; phone?: string; email?: string }
  shippingAddress?: { city?: string; street?: string }
}

export interface OrdersPageResponse {
  orders: OrderHistoryItemProps[]
  totalPages: number
  currentPage: number
  hasMore: boolean
}

interface OrdersPageBackendRes {
  data: BackendOrder[]
  totalPages: number
  currentPage: number
  hasMore: boolean
}

function mapOrderToHistoryItem(order: BackendOrder): OrderHistoryItemProps {
  return {
    date: order.orderDate,
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
      }),
      transformResponse: (res: CreateOrderRes) => res.data,
    }),
    getUserOrders: build.query<OrderHistoryItemProps[], string>({
      query: (userId) => `/users/${userId}/orders`,
      transformResponse: (res: { data: BackendOrder[] }) => res.data.map(mapOrderToHistoryItem),
      providesTags: (_, __, userId) => [{ type: 'UserOrders' as const, id: userId }],
    }),
    getUserOrdersPaginated: build.query<OrdersPageResponse, { userId: string; page: number; limit: number }>({
      query: ({ userId, page, limit }) => ({
        url: `/users/${userId}/orders`,
        params: { page, limit },
      }),
      transformResponse: (res: OrdersPageBackendRes) => ({
        orders: res.data.map(mapOrderToHistoryItem),
        totalPages: res.totalPages,
        currentPage: res.currentPage,
        hasMore: res.hasMore,
      }),
      serializeQueryArgs: ({ queryArgs }) => queryArgs.userId,
      merge: (currentCache, newItems) => {
        if (newItems.currentPage === 1) {
          currentCache.orders = newItems.orders
        } else {
          currentCache.orders.push(...newItems.orders)
        }
        currentCache.currentPage = newItems.currentPage
        currentCache.totalPages = newItems.totalPages
        currentCache.hasMore = newItems.hasMore
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page,
    }),
  })
})

export const { useGetUserOrdersQuery, useGetUserOrdersPaginatedQuery } = orderApi
