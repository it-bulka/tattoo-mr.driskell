export interface ApiError {
  data?: {
    message?: string
    error?: string
  }
}

export type NonNullableFields<T> = Required<{ [K in keyof T]: NonNullable<T[K]> }>