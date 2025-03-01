import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts';
import { cartReducer } from '@/entities/Cart/model/slice/cartSlice.tsx'
import { useDispatch } from 'react-redux';

export const createStore = () => {
  const rootReducer: ReducersMapObject<StateSchema> = {
    cart: cartReducer
  }

  const store = configureStore({
    devTools: __IS_DEV__,
    reducer: rootReducer
  })

  return store
}


export type AppDispatch = ReturnType<typeof createStore>['dispatch']
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
