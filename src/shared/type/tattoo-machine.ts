import { Product } from '@/entities/ProductCard/ProductCard.tsx';


export const specsPropertyList = {
  'tattoo-sets': [
    'motorType',
    'voltage',
    'frequency',
    'weight',
    'material',
    'color',
    'size'
  ],
  'tattoo-machines': [
    'motorType',
    'voltage',
    'weight',
    'speed',
    'strokeLength',
    'gripType',
    'material',
    'color'
  ],
  'tattoo-inks': [
    'inkType',
    'volume',
    'brand',
    'shelfLife',
    'sterilization',
    'material',
    'colorsAvailable'
  ],
  'tattoo-needles': [
    'needleSize',
    'needleType',
    'material',
    'sterilization',
    'quantityPerBox',
    'gripType',
    'color',
    'safety'
  ],
  'tattoo-holders': [
    'material',
    'size',
    'compatibility',
    'weight',
    'color'
  ],
  'tattoo-tips': [
    'size',
    'material',
    'color',
    'compatibility'
  ],
  'power-supplies': [
    'voltage',
    'wattage',
    'type',
    'weight',
    'compatibility'
  ],
  'pedals-and-wires': [
    'type',
    'length',
    'material',
    'color'
  ],
  'accessories': [
    'type',
    'material',
    'size'
  ],
  'printers-and-tablets': [
    'type',
    'size',
    'material',
    'compatibility',
    'color'
  ],
  'protection-containers-consumables': [
    'type',
    'material',
    'capacity',
    'color'
  ]
} as const
export type Category = 'tattoo-sets' | 'tattoo-machines' | 'tattoo-inks' | 'tattoo-needles' | 'tattoo-holders' |
  'tattoo-tips' | 'power-supplies' | 'pedals-and-wires' | 'accessories' | 'printers-and-tablets' | 'protection-containers-consumables'

type SpecsPropertyList = typeof specsPropertyList
export type CategoryPropertyObject<T extends readonly string[]> = {
  [K in T[number]]: string
}
export type SpecsUnion = {
  [K in keyof SpecsPropertyList]: CategoryPropertyObject<SpecsPropertyList[K]>
}[keyof SpecsPropertyList]

export interface ProductExtended extends Product {
  stock: number
  shortDescription: string
  longDescription: string[]
  priceCurrent: number
  specs: SpecsUnion
  category: Category
}
