const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  const notificationStyle = {
    color: type === 'error' ? 'red' : 'green',
    backgroundColor: type === 'error' ? '#fdd' : '#dfd',
    border: `2px solid ${type === 'error' ? 'red' : 'green'}`,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification