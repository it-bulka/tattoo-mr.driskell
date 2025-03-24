export const sortOptions = [
  { value: 'popular', label: 'sort.popular' },
  { value: 'alphabetically', label: 'sort.alphabetically' },
  { value: 'cheap', label: 'sort.cheap' },
  { value: 'expensive', label: 'sort.expensive' }
] as const

export type Sorts = typeof sortOptions[number]['value']

export const typeOptions = [
  { value: 'rotary', label: 'machine types.rotary' },
  { value: 'coil', label: 'machine types.coil' },
  { value: 'pen-style', label: 'machine types.pen-style' },
  { value: 'pneumatic', label: 'machine types.pneumatic' },
] as const

export type Types = typeof typeOptions[number]['value']

export type Option<T extends string> = { value: T, label: string}