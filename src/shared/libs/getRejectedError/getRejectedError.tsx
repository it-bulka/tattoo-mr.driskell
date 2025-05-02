import { ApiError } from '@/shared/type';

export const getRejectedError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  } else if((error as ApiError).data) {
    const errorMsg = error as ApiError
    return  errorMsg.data?.message || errorMsg.data?.error || null
  }

  return null
}