import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/authenticationReducer'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(logoutUser())
    dispatch(setNotification(`${user.username} logged out`))
    navigate('/login')
  }

  if (!user) {
    return null
  }

  return (
    <p>
      {user.name} logged in
      <button onClick={logout}> logout</button>
    </p>
  )
}

export default Logout
