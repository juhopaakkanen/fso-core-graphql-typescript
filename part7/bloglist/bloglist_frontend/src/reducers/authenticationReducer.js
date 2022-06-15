import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: null,
  reducers: {
    setUser(_, action) {
      return action.payload
    },
    resetUser() {
      return null
    }
  }
})

export const { setUser, resetUser } = authenticationSlice.actions

export const maintainAuthentication = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(resetUser())
  }
}

export default authenticationSlice.reducer
