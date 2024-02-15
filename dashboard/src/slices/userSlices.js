import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')): null,
}

export const userSlices = createSlice({
    name: 'user',
    initialState,
    reducers: {
      activeUser: (state, action) => {
        state.value = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { activeUser } = userSlices.actions
  
  export default userSlices.reducer