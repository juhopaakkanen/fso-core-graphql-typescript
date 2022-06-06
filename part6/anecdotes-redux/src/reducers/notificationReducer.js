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

export const setNotification = (text, timeout) => {
  return async dispatch => {
    dispatch(createNotification(text))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000)
  }
}

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer