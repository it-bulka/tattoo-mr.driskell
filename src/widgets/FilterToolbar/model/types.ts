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

export const needleTypeOptions = [
  { value: 'round-liner', label: 'needle types.round-liner' },
  { value: 'magnum',      label: 'needle types.magnum' },
  { value: 'shader',      label: 'needle types.shader' },
  { value: 'flat',        label: 'needle types.flat' },
] as const

export type NeedleTypes = typeof needleTypeOptions[number]['value']

export type Option<T extends string> = { value: T; label: string }

export type QuickFilterTag = 'new' | 'hit' | 'discount' | 'beginner' | 'professional'

export const QUICK_FILTER_TAGS: Array<{ value: QuickFilterTag; i18nKey: string }> = [
  { value: 'new',          i18nKey: 'filter-level.new' },
  { value: 'hit',          i18nKey: 'filter-level.hit' },
  { value: 'discount',     i18nKey: 'filter-level.discount' },
  { value: 'beginner',     i18nKey: 'filter-level.beginner' },
  { value: 'professional', i18nKey: 'filter-level.professional' },
]

export interface FilterState {
  tags: QuickFilterTag[]
  sort: Sorts
  minPrice: number
  maxPrice: number
  inStock: boolean
  motorTypes: Types[]
  needleTypes: NeedleTypes[]
}

export const PRICE_MAX_DEFAULT = 4400

export const initialFilterState: FilterState = {
  tags: [],
  sort: 'popular',
  minPrice: 0,
  maxPrice: PRICE_MAX_DEFAULT,
  inStock: false,
  motorTypes: [],
  needleTypes: [],
}

export interface FilterApiParams {
  tags?: string
  sort?: Sorts
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  motorType?: string
  needleType?: string
}