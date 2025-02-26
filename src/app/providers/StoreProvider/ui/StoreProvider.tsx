import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { createStore } from '../config/store.ts';

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const store = createStore()
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}