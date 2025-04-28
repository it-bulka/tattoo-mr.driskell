import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SearchSchema } from '../type'


const initialState: SearchSchema = {
  value: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const {
  actions: searchActions,
  reducer: searchReducer,
} = searchSlice