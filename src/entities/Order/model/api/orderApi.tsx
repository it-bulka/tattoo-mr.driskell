import { rtkApi } from '@/shared/api/rtkApi.ts'
import { Order, OrderRes } from '../types/orderSchema.tsx'

export const orderApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    sendOrder: build.mutation<OrderRes, Order>({
      query: (order) => ({
        url: '/orders',
        body: order,
        method: 'POST',
      })
    })
  })
})