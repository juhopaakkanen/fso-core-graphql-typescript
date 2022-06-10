import { useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      dispatch(setNotification(`${user.username} logged in`))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setNotification(`${user.username} logged out`))
    setUser(null)
  }

  const removeBlog = async blogId => {
    try {
      const blog = blogs.find((blog) => blog.id === blogId)
      blogService.setToken(user.token)
      if (window.confirm(`Delete ${blog.title} ${blog.author}?`)) {
        await blogService.remove(blogId)
        setBlogs(blogs.filter((blog) => blog.id !== blogId))
        dispatch(setNotification(`Removed ${blog.title} ${blog.author}`))
      }
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }

  const updateLikes = async (blogId, blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogId, blogObject)
      setBlogs(
        blogs
          .map((blog) => (blog.id !== blogId ? blog : updatedBlog))
          .sort((a, b) => b.likes - a.likes)
      )
      dispatch(setNotification(`Liked ${updatedBlog.title}`))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }

  const togglableBlogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  return (
    <div>
      <h1>Bloglist app</h1>
      <Notification />
      {user === null ? (
        <LoginForm login={login} />
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button onClick={logout}> logout</button>
          </p>
          {togglableBlogForm()}
          <BlogList
            handleLikes={updateLikes}
            handleRemove={removeBlog}
            user={user}
          />
        </div>
      )}
    </div>
  )
}

export default App
