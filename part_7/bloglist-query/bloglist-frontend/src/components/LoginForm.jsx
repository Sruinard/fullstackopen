import PropTypes from 'prop-types'
import { useUser } from '../hooks/user'
import { useNotificationDispatch, useNotificationValue } from './NotificationContext'
import { useState } from 'react'
import Notification from './Notification'

// const loginForm = () => {
//   const hideWhenVisible = { display: loginVisible ? 'none' : '' }
//   const showWhenVisible = { display: loginVisible ? '' : 'none' }

//   return (
//     <div>
//       <div style={hideWhenVisible}>
//         <button onClick={() => setLoginVisible(true)}>log in</button>
//       </div>
//       <div style={showWhenVisible}>
//         <h3>login to application</h3>
//         <LoginForm
//           username={username}
//           password={password}
//           handleUsernameChange={({ target }) => setUsername(target.value)}
//           handlePasswordChange={({ target }) => setPassword(target.value)}
//         />
//         <button onClick={() => setLoginVisible(false)}>cancel</button>
//       </div>
//     </div>
//   )
// }

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

  return <div>
    <h3>Login</h3>
    {notification !== null ?
        <Notification message={notification} type={notification.includes('failed') ? 'error' : 'success'} />
        : null
      }
    <form onSubmit={handleLogin}>
      <div>
        username
        <input data-testid='username' value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        password
        <input data-testid='password' type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
}

export default LoginForm