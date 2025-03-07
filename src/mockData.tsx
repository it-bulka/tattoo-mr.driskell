import ProductImg from '@/shared/assets/toDelete/product.png';
import ProductImg2 from '@/shared/assets/toDelete/product-2.png';
import ProductImg3 from '@/shared/assets/toDelete/product-3.png';
import ProductImg4 from '@/shared/assets/toDelete/product-4.png';
import { type Product } from '@/entities/ProductCard/ProductCard.tsx'
import { CartItemType } from '@/entities/Cart/ui/Cart/CartItem.tsx'
// TODO:connect to back
export const productsList: Product[] = Array.from({ length: 10 }, (_, index) => ({
  imgs: [ProductImg, ProductImg2, ProductImg3, ProductImg4],
  title: 'Foxxx Kitsune Mini Black Vintage RCA',
  price: 6000,
  id: index
}))


export const cartList: CartItemType[] = Array.from({ length: 10 }, (_, index) => ({
  img: ProductImg,
  title: 'Foxxx Kitsune Mini Black Vintage RCA',
  price: 6000,
  amount: 4,
  totalPrice: 12000,
  id: index
}))
