import { configureStore } from '@reduxjs/toolkit'

export const createStore = () => {
  const store = configureStore({
    devTools: __IS_DEV__,
    reducer: {}
  })

  return store
}
