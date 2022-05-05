const Notification = ({ message, error }) => {
    const notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
    if (error) {
        notificationStyle.color='red' 
    }

    if (message === null) {
      return null
    }
    return (
      <div style={notificationStyle}>
        {message} 
      </div>
    )
  }

  export default Notification