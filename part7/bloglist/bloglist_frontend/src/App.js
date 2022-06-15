import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { maintainAuthentication } from './reducers/authenticationReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(maintainAuthentication())
  }, [dispatch])

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
        <LoginForm />
      ) : (
        <div>
          <Logout />
          <UserList />
          {togglableBlogForm()}
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
