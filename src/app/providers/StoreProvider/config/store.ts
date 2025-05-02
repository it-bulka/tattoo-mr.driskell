import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import { cartReducer } from '@/entities/Cart/model/slice/cartSlice.tsx'
import { useDispatch } from 'react-redux'
import { rtkApi } from '@/shared/api/rtkApi.ts'
import { productsReducer } from '@/entities'
import { userReducer } from '@/entities/User'
import { cartSyncMiddleware } from '@/entities/Cart'
import { Action, ThunkAction } from '@reduxjs/toolkit'
import { orderReducer } from '@/entities/Order'
import { searchReducer } from '@/features/searchTattooMachine'
import { favouritesReducer, likedIdsMiddleware } from '@/features/addFavourite'

export const createStore = () => {
  const rootReducer: ReducersMapObject<StateSchema> = {
    cart: cartReducer,
    products: productsReducer,
    user: userReducer,
    order: orderReducer,
    search: searchReducer,
    favourites: favouritesReducer,
    [rtkApi.reducerPath]: rtkApi.reducer
  }

  const store = configureStore({
    devTools: __IS_DEV__,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rtkApi.middleware, cartSyncMiddleware, likedIdsMiddleware)
  })

  return store
}


export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>
export type AppDispatch = ReturnType<typeof createStore>['dispatch']
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>