import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <div className="container">
      {notification && (
        <Alert variant={notification.error ? 'danger' : 'success'}>
          {notification.message}
        </Alert>
      )}
    </div>
  )
}

export default Notification
