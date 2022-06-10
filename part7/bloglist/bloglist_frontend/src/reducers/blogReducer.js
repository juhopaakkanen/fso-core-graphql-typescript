import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(_, action) {
      return action.payload
    }
  }
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      const newBlog = await blogService.create(blogObject)
      dispatch(appendBlog(newBlog))
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
      )
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }
}

export default blogSlice.reducer
