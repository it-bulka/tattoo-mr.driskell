export interface User {
  id: string
  name: string
  email: string
  discount?: number
  phone?: string
  city?: string
  street?: string
  apartment?: string
  entrance?: string
  floor?: string
  doorphone?: string
}

export interface UserSchema {
  data?: User
  loading: boolean
  error?: string
}
