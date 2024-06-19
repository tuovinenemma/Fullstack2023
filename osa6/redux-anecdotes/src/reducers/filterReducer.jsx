import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const anecdoteSlice = createSlice({
  name: 'anecdotesFilter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload
    }
  }
})

export const { setFilter } = anecdoteSlice.actions
export default anecdoteSlice.reducer