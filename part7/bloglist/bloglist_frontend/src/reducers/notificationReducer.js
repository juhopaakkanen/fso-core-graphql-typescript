import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeoutID = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(_, action) {
      const notification = action.payload
      return notification
    },
    removeNotification() {
      return initialState
    }
  }
})

export const setNotification = (message, error = false) => {
  return async (dispatch) => {
    clearTimeout(timeoutID)
    dispatch(createNotification({ message, error }))
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}

export const { createNotification, removeNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
