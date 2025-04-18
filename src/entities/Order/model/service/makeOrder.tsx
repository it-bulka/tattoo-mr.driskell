import { createAsyncThunk } from '@reduxjs/toolkit'
import { CartFormData } from '@/features/CartForm/model/types/cartFormTypes.tsx'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import {
  getUserId,
  getOrderDeliverySelector,
  getOrderPaymentSelector,
} from '@/entities'
import { orderApi } from '../api/orderApi.tsx'
import { OrderRes } from '../types/orderSchema.tsx'
import { getCartItemsSelector } from '@/entities/Cart'


export const makeOrder = createAsyncThunk<
  OrderRes,
  CartFormData,
  {
    state: StateSchema,
    rejectValue: string
  }
>(
  'orders/makeOrder',
  async (buyerData, { dispatch, getState, rejectWithValue }) => {
    const state = getState()
    const userId = getUserId(state)
    const delivery = getOrderDeliverySelector(state)
    const paymentType = getOrderPaymentSelector(state)
    const itemsToBuy = getCartItemsSelector(state)

    const errors = []
    if(!userId) errors.push(`user id`)
    if(!delivery) errors.push(`delivery type`)
    if(!paymentType) errors.push(`payment type`)
    if(!itemsToBuy.length) errors.push(`items to buy`)

    if(errors.length) {
      const errorsString = errors.join(', ')
      const err = `Provide the following data: ${errorsString}`
      return rejectWithValue(err)
    }

    const { name, email, phone, ...rest } = buyerData

    const data = {
      userId,
      paymentMethod: paymentType,
      deliveryMethod: delivery,
      buyer: { name, email, phone },
      shippingAddress: rest,
      items: itemsToBuy.map(item => ({
        id: item.productId,
        quantity: item.quantity,
      }))
    }

    try {
      const response = await dispatch(
        orderApi.endpoints.sendOrder.initiate(data)
      ).unwrap()

      return response
    } catch (e) {
      console.log(e)
      return rejectWithValue('')
    }
  }
)