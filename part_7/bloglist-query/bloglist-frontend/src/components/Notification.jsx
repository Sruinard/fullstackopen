import React from 'react'
import './Notification.css' // Import the CSS file
import { useNotificationValue } from './NotificationContext'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const baseStyles = "px-4 py-3 rounded-md shadow-sm mb-4 text-sm font-medium"
  const typeStyles = type === 'error' 
    ? "bg-red-50 text-red-700 border border-red-200"
    : "bg-green-50 text-green-700 border border-green-200"

  return (
    <div className={`${baseStyles} ${typeStyles}`} role="alert">
      {message}
    </div>
  )
}

export default Notification