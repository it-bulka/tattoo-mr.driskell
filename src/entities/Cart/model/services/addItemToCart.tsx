import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { CartItemType } from '../type/cartSchema.tsx'
import { cartActions } from '@/entities/Cart/model/slice/cartSlice.tsx'
import { ProductWithAmount } from '@/entities/ProductCard/ProductCard.tsx'

const productToCartItem = (product: ProductWithAmount): CartItemType => {
  const price = product.priceCurrent ?? product.price
  return {
    productId: product.id,
    quantity: product.quantity ?? 1,
    price,
    originalPrice: product.price,
    total: price * (product.quantity ?? 1),
    title: product.title,
    image: product.images[0],
  }
}

export const addItemsToCart = createAsyncThunk<
  void,
  ProductWithAmount[],
  { state: StateSchema }
>(
  'cartItem/addItemToCart',
  async (products, { dispatch }) => {
    const cartItems: CartItemType[] = products.map(productToCartItem)
    if (cartItems.length === 0) return
    dispatch(cartActions.addItems(cartItems))
  }
)
