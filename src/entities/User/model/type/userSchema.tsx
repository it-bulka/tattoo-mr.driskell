export interface User {
  id: string
  name: string
  email: string
  discount?: number
}

export interface UserSchema {
  data?: User
  loading: boolean
  error?: string
}