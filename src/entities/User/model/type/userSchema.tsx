export interface User {
  id: string
  name: string
  email: string
}

export interface UserSchema {
  data?: User
  loading: boolean
  error?: string
}