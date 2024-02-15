import { configureStore } from '@reduxjs/toolkit'
import userReducers from '../slices/userSlices'

export const store = configureStore({
    reducer: {
        user: userReducers,
    },
  })