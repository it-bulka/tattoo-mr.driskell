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
  brands: []
}
