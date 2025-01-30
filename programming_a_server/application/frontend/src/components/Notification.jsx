const Notification = ({ msg, type }) => {
  if (!msg) return null

  const notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    ...(type === 'error' || type === 'delete')
      ? { color: 'red', borderColor: 'red' }
      : { color: 'green', borderColor: 'green' }
  }

  return (
    <div style={notificationStyle}>
      {msg}
    </div>
  )
}

export default Notification