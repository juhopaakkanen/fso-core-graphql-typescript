import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/authenticationReducer'
import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const LoginForm = () => {
  const navigate = useNavigate()
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username: username.value, password: password.value }))
    resetUsername()
    resetPassword()
    navigate('/blogs')
  }

  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control id="username" {...username} />
          <Form.Label>password:</Form.Label>
          <Form.Control id="password" {...password} />
          <Button id="login-button" variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
