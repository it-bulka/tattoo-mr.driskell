export const catalogTabsList = [
  {
    id: 'category',
    name: 'filter.by category'
  },
  {
    id: 'brands',
    name: 'filter.by brands'
  }
] as const

export type CatalogTabName = (typeof catalogTabsList)[number]['id']
export type CatalogTabsObject<T> = {
  [K in CatalogTabName]: T
}

export const catalogContent: CatalogTabsObject<string[]> = {
  category: [
    'new arrivals', 'tattoo sets', 'tattoo machines', 'tattoo inks', 'tattoo needles', 'tattoo holders',
    'tattoo tips', 'power supplies', 'pedals and wires', 'accessories', 'printers and tablets', 'protection, containers, consumables'
  ],
  brands: [
    'Aliance', 'Aloe Tattoo', 'Anchored by Nikko Hurtado', 'BC Invention Comrany', 'Beauty Bit', 'Bishop Rotary', 'Burlak Tattoo Machines', 'Cheyenne HAWK', 'Critical Tattoo', 'Dermalize Protective', 'Dynamic Colors',
    'EGO Bez’s Rotary', 'Eikon Device Inc.', 'Electrum', 'EQUALISER by Kwadron', 'Eternal', 'Excalibur', 'Fantasia Art Supply', 'FKirons', 'Hanafy', 'HM Tattoo Machines', 'Ink Machines',
    'InkJecta Tattoo Machine', 'Intenze', 'JACK & ALEXX', 'Kashalot Rotary', 'Kuro Sumi', 'KWADRON™', 'Lauro Paolini', 'Lithuanian Irons', 'Lucky Supply', 'Mercator Medical', 'Millenium Mom’s Ink',
    'NEMESIS', 'Nocturnal Tattoo Ink', 'Panthera', 'Perma Blend', 'Precision Needles', 'Precision Tattoo Supply', 'Premier Products', 'Radiant', 'Reprofx® Spirit™', 'Right Stuuf', 'S8TATTOO',
    'Skinductor', 'Starbrite', 'Tattoorevive', 'TURANIUM Fabrika Rotary', 'UNI–CART', 'Vlad Blad', 'World Famous Bala', 'World Famous Tattoo Ink', '2K2BT'

  ]
}