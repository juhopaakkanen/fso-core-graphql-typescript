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
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
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

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      })
      .catch((error) => {
        notification(error.response.data.error, true)
      })
  }

  const updateLikes = (blogId, blogObject) => {
    blogService
      .update(blogId, blogObject)
      .then((updatedBlog) => {
        setBlogs(blogs
          .map(blog => blog.id !== blogId ? blog : updatedBlog)
          .sort((a, b) => b.likes - a.likes))
        notification(`Liked ${updatedBlog.title}`)
      })
      .catch((error) => {
        notification(error.response.data.error, true)
      })
  }

  const notification = (message, error = false) => {
    setNotificationMessage({ message, error })
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const blogForm = () => (
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
          {blogForm()}
          <Blogs blogs={blogs} handleLikes={updateLikes} />
        </div>
      }
    </div>
  )
}

export default App
