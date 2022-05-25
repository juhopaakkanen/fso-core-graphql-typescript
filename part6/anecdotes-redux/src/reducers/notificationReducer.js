import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState ,
  reducers: {
    createNotification(state, action) {
      const message = action.payload
      return message
    },
    removeNotification(state, action) {
      return initialState
    }
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer