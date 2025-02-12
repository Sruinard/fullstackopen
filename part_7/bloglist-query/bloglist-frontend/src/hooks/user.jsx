import loginService from '../services/login'
import blogService from '../services/blogs'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNotificationDispatch } from '../components/NotificationContext'

const useUser = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const { data: user } = useQuery({
    queryKey: ['user'],
    initialData: null
  })


  const setUser = (user) => {
    queryClient.setQueryData(['user'], user, {
    })
  }

  const login = async (username, password) => {
    try {
      console.log(`logging in with ${username} and ${password}`)
      const user = await loginService.login({
        username, password,
    })
    console.log('user', user)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      return user
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
      throw error
    }
  }

  const logout = () => {
    queryClient.setQueryData(['user'], null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('user', user)
      setUser(user)
    }
  }, [])

  return { user, login, logout }
}

export { useUser }