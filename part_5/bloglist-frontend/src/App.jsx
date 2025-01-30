import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [loginVisible, setLoginVisible] = useState(true)


  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('user logged in:', user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }


  const addBlogFromBlogObject = async (blogObject) => {
    try {
      // Check if user is defined before proceeding
      if (!user) {
        throw new Error('User is not defined')
      }
      blogFormRef.current.toggleVisibility()
      console.log(`creating new blog for user with id: ${user.id}`)
      const newBlog = await blogService.create(blogObject)
      console.log('new blog:', newBlog)

      setBlogs([...blogs, newBlog])
      setNotification('new blogpost created!')
      setTimeout(() => setNotification(null), 2000)
    } catch (exception) {
      setNotification('failed to create blogpost')
      setTimeout(() => setNotification(null), 2000)
    }
  }

  const deleteBlog = async (blogId) => {
    await blogService.deleteBlog(blogId)
    setBlogs(
      blogs
        .filter(blog => blog.id !== blogId)
        .sort((a, b) => {return b.likes - a.likes})
    )
  }

  const updateBlogFromBlogUpdate = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject.id, blogObject)
    // Update blogs state using functional update for in-place modification
    setBlogs(
      blogs
        .map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
        .sort((a, b) => {return b.likes - a.likes}
        )
    )

    setNotification('blogpost updated!')
    setTimeout(() => setNotification(null), 2000)

  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(
        blogs
          .sort((a, b) => {return b.likes - a.likes})
      )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      console.info('user found in local storage:', loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <h3>login to application</h3>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm addBlogFromBlogObject={addBlogFromBlogObject} user={user}/>
    </Togglable>
  )

  return (
    <div>
      {notification !== null ?
        <Notification message={notification} type={notification.includes('failed') ? 'error' : 'success'}/>
        : null
      }
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in  <button onClick={handleLogout}>logout</button></p>
          {blogForm()}
        </div>
      }

      <h2>blogs</h2>
      <div data-testid='blogs'>
      {user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlogFromBlogUpdate} deleteBlog={deleteBlog} />
      )}
      </div>
    </div>
  )
}

export default App