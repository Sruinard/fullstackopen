import PropTypes from 'prop-types'
import { useUser } from '../hooks/user'
import { useNotificationDispatch, useNotificationValue } from './NotificationContext'
import { useState } from 'react'
import Notification from './Notification'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notificationDispatch = useNotificationDispatch()
  const notification = useNotificationValue()
  const { user, login, logout } = useUser()
  if (user) {
    return null
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await login(username, password)
    } catch (error) {
      console.error('error', error)
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: 'failed to login'
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAR_NOTIFICATION'
        })
      }, 5000)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-sm w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
            Login to your account
          </h2>
        </div>
        {notification !== null && (
          <Notification 
            message={notification} 
            type={notification.includes('failed') ? 'error' : 'success'} 
          />
        )}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  data-testid="username"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  data-testid="password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm