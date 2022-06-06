import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeoutID = ''

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

export const setNotification = (text, delay) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch(createNotification(text))
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, delay* 1000)
  }
}

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer