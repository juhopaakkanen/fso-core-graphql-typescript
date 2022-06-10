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
          <BlogList user={user} />
        </div>
      )}
    </div>
  )
}

export default App
