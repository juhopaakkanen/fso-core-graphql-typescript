import { Alert } from '@mui/material'

const Notification = ({ errorMessage }) => {
  return (
    <div>{errorMessage && <Alert severity="error">{errorMessage}</Alert>}</div>
  )
}

export default Notification
