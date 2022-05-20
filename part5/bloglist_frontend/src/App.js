import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const fetchData = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes))
    }
    fetchData()
  }, [])

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
      notification(`${user.username} logged in`)
    } catch (error) {
      notification(error.response.data.error, true)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService.setToken(user.token)
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      notification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    } catch (error) {
      notification(error.response.data.error, true)
    }
  }

  const removeBlog = async (blogId) => {
    try {
      const blog = blogs.find(blog => blog.id === blogId)
      blogService.setToken(user.token)
      if (window.confirm(`Delete ${blog.title} ${blog.author}?`)) {
        await blogService.remove(blogId)
        setBlogs(blogs.filter(blog => blog.id !== blogId))
        notification(`Removed ${blog.title} ${blog.author}`)
      }
    } catch (error) {
      notification(error.response.data.error, true)
    }
  }

  const updateLikes = async (blogId, blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogId, blogObject)
      setBlogs(blogs
        .map(blog => blog.id !== blogId ? blog : updatedBlog)
        .sort((a, b) => b.likes - a.likes))
      notification(`Liked ${updatedBlog.title}`)
    } catch (error) {
      notification(error.response.data.error, true)
    }
  }

  const notification = (message, error = false) => {
    setNotificationMessage({ message, error })
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const togglableBlogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  return (
    <div>
      <h1>Bloglist app</h1>
      <Notification message={notificationMessage} />
      {user === null ?
        <LoginForm login={login} /> :
        <div>
          <p>
            {user.name} logged in
            <button onClick={logout}> logout</button>
          </p>
          {togglableBlogForm()}
          <Blogs
            blogs={blogs}
            handleLikes={updateLikes}
            handleRemove={removeBlog}
            user={user}
          />
        </div>
      }
    </div>
  )
}

export default App
