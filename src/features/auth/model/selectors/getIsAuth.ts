import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'

export const getIsAuth = (state: StateSchema) => Boolean(state.auth.accessToken)
