export interface Service {
  _id: string
  name: string
  description: string
  type: 'fixed' | 'percentage'
  value: number
  currency: string
}
