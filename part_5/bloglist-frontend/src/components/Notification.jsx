import React from 'react'
import './Notification.css' // Import the CSS file

const Notification = ({ message, type }) => {
  if (!message) {
    return null // Don't render anything if there's no message
  }

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  )
}

export default Notification