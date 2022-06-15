import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/authenticationReducer'

const Logout = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutUser())
    dispatch(setNotification(`${user.username} logged out`))
  }

  return (
    <p>
      {user.name} logged in
      <button onClick={logout}> logout</button>
    </p>
  )
}

export default Logout
