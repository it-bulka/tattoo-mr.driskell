import ProductImg from '@/shared/assets/toDelete/product.png';
import ProductImg2 from '@/shared/assets/toDelete/product-2.png';
import ProductImg3 from '@/shared/assets/toDelete/product-3.png';
import ProductImg4 from '@/shared/assets/toDelete/product-4.png';
import MachineImg1 from '@/shared/assets/toDelete/tattoo-machine/machine-1.png';
import MachineImg2 from '@/shared/assets/toDelete/tattoo-machine/machine-2.png';
import MachineImg3 from '@/shared/assets/toDelete/tattoo-machine/machine-3.png';
import MachineImg4 from '@/shared/assets/toDelete/tattoo-machine/machine-4.png';
import { type Product } from '@/entities/ProductCard/ProductCard.tsx'
import { CartItemType } from '@/entities/Cart/ui/Cart/CartItem.tsx'
//PromoCodes
import PromoCodeImg from '@/shared/assets/toDelete/promocode.png'
// TODO:connect to back
export const productsList: Product[] = Array.from({ length: 10 }, (_, index) => ({
  imgs: [ProductImg, ProductImg2, ProductImg3, ProductImg4],
  title: 'Foxxx Kitsune Mini Black Vintage RCA',
  price: 6000,
  id: index,
  tags: ['new', 'absent']
}))


export const cartList: CartItemType[] = Array.from({ length: 2 }, (_, index) => ({
  img: ProductImg,
  title: 'Foxxx Kitsune Mini Black Vintage RCA',
  price: 6000,
  amount: 4,
  totalPrice: 12000,
  id: index
}))

export const tattooMachineDetails = {
  description: [
    'Viper is a machine built on a powerful motor, with the frame of this model made from durable and lightweight aluminum alloy. As a result, the weight of the machine is only 120g.',
    'This model is equipped with an adjustable eccentric. To adjust the needle stroke you need, simply move your holder in the clamp forward or backward. The eccentric is also designed so that the machine lacks centrifugal force, which eliminates vibration during operation. There is a small and convenient pin at the bottom for attaching the bandage rubber.',
    'The diameter of the clamping bolt is larger than on similar models, so the holder is fixed without any issues or extra effort. This model easily pushes any needles and cartridges.\n' +
    'All necessary recommendations are provided in the instruction manual included in the box with the product.',
    'The machine is suitable for both tattoos and permanent makeup.'
  ],
  slides: [
    {
      img: MachineImg1,
      tags: ['new'],
      id: '1'
    },
    {
      img: MachineImg2,
      tags: ['new', 'discount'],
      id: '2'
    },
    {
      img: MachineImg3,
      tags: ['new'],
      id: '3'
    },
    {
      img: MachineImg4,
      tags: ['new'],
      id: '4'
    }
  ]
}

export const promoCodes = Array.from({ length: 10 }, (_, index) => ({
  img: PromoCodeImg,
  title: 'Package "Summer"',
  description: [
    'The hottest summer of the century doesn\'t want to leave and is bringing you new colors until the end of the season.',
    'With a purchase of 5500 or more, you will receive a 1% discount on absolutely any product! Hurry and paint your life with the colors of summer!'
  ],
  id: index
}))