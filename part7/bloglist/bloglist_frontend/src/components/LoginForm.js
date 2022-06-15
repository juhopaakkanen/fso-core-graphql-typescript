import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/authenticationReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    try {
      dispatch(
        loginUser({ username: username.value, password: password.value })
      )
      dispatch(setNotification(`${username.value} logged in`))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
    resetUsername()
    resetPassword()
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id="username" {...username} />
        </div>
        <div>
          password
          <input id="password" {...password} />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
