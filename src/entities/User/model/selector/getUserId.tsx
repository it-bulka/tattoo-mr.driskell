import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'

export const getUserId = (state: StateSchema) => {
  return state.user?.id
}