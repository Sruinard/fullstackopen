import React from 'react'
import './Notification.css' // Import the CSS file
import { useNotificationValue } from './NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  const type = notification.includes('failed') ? 'error' : 'success'
  console.log('notification', notification)
  if (!notification) {
    return null // Don't render anything if there's no message
  }

  return (
    <div className={`notification ${type}`}>
      {notification}
    </div>
  )
}

export default Notification