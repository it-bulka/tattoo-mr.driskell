import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'

export const getSearchValueSelectors = (state: StateSchema) => state.search.value