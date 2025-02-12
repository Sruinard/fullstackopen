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
  const { user } = useUser()
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
      <BlogForm user={user} />
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
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">Error: {error.message}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {notification && (
          <Notification 
            message={notification} 
            type={notification.includes('failed') ? 'error' : 'success'} 
          />
        )}
        
        {user === null ? (
          <LoginForm />
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Blogs</h2>
              <div className="flex items-center justify-center">
                {blogForm()}
              </div>
            </div>

            <div className="space-y-4" data-testid='blogs'>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={user} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home