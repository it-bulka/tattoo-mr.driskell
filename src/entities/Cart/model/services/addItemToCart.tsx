import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProductsByKey } from '../../../ProductList/model/selector/getProductsSelector.ts'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { CartItemType } from '../type/cartSchema.tsx'
import { cartActions } from '@/entities/Cart/model/slice/cartSlice.tsx'
import { ProductWithAmount } from '@/entities/ProductCard/ProductCard.tsx'

export const addItemsToCart = createAsyncThunk<
  void,
  string[] | ProductWithAmount[],
  { state: StateSchema }
>(
  'cartItem/addItemToCart',
  async (products, { getState, dispatch }) => {
    const state = getState()
    const cartItems: CartItemType[] = []

    const addSingleProduct = (product: ProductWithAmount) => {
      const currentPrice = product.priceCurrent || product.price

      const cartItem: CartItemType = {
        productId: product.id,
        quantity: product?.quantity || 1,
        price: currentPrice,
        originalPrice: product.price,
        total: currentPrice,
        title: product.title,
        image: product.images[0]
      }
      cartItems.push(cartItem)
    }

    const addByProductsData = (products: ProductWithAmount[]) => {
      for (const product of products) {
        addSingleProduct(product)
      }
    }

    const addByIds = (productIds: string[]) => {
      for (const id of productIds) {
        const product = getProductsByKey(id)(state)

        if(!product) continue
        addSingleProduct(product)
      }
    }


    if(typeof products[0] === 'string') {
      addByIds(products as string[])
    } else {
      addByProductsData(products as ProductWithAmount[])
    }

    if(cartItems.length <= 0) return

    dispatch(cartActions.addItems(cartItems))
  }
)