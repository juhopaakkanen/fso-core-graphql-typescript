import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Notification from './components/Notification'
import Logout from './components/Logout'
import Blog from './components/Blog'
import User from './components/User'
import LoginForm from './components/LoginForm'
import BlogsView from './components/BlogsView'
import UsersView from './components/UsersView'
import RootView from './components/RootView'
import { initializeBlogs } from './reducers/blogReducer'
import { maintainAuthentication } from './reducers/authenticationReducer'
import { initializeUsers } from './reducers/userReducer'
import { Routes, Route, Link, Navigate } from 'react-router-dom'

const App = () => {
  const user = useSelector((state) => state.user)
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

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/blogs">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user ? (
        <Logout />
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}

      <h2>Bloglist app</h2>
      <Notification />

      <div>
        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route
            path="users"
            element={user ? <UsersView /> : <Navigate replace to="/login" />}
          />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route
            path="/login"
            element={!user ? <LoginForm /> : <Navigate replace to="/blogs" />}
          />
          <Route
            path="/blogs"
            element={user ? <BlogsView /> : <Navigate replace to="/login" />}
          />
          <Route path="/" element={<RootView />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
