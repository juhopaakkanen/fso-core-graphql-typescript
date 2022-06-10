import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    incrementLikes(state, action) {
      const id = action.payload
      return state
        .map((a) => (a.id !== id ? a : { ...a, likes: a.likes + 1 }))
        .sort((a, b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(_, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    }
  }
})

export const { incrementLikes, appendBlog, setBlogs, deleteBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    //temp, fix after refactoring user to Redux
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blogId, blogObject) => {
  return async (dispatch) => {
    await blogService.update(blogId, blogObject)
    dispatch(incrementLikes(blogId))
  }
}

export const removeBlog = (blogId, token) => {
  return async (dispatch) => {
    blogService.setToken(token)
    await blogService.remove(blogId)
    dispatch(deleteBlog(blogId))
  }
}

export default blogSlice.reducer
