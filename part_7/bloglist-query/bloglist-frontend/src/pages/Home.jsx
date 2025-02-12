import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import Notification from '../components/Notification'
import LoginForm from '../components/LoginForm'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { useNotificationValue } from '../components/NotificationContext'
import { useUser } from '../hooks/user'
import Navigation from '../components/Navigation'

const Home = () => {
  const notification = useNotificationValue()
  const { user, login, logout } = useUser()


  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm  user={user} />
    </Togglable>
  )

  const { data: blogs, isLoading, isError, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
    retryDelay: 1000,
    refetchOnMount: false,
  })


  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }



  return (
    <div>
      <Navigation />
      {notification !== null ?
        <Notification message={notification} type={notification.includes('failed') ? 'error' : 'success'} />
        : null
      }
      {user === null ?
        <LoginForm /> :
        <div>
          {blogForm()}
        </div>
      }

      <h2>blogs</h2>
      <div data-testid='blogs'>
        {user !== null && blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} />
        )}
      </div>
    </div>
  )
}

export default Home