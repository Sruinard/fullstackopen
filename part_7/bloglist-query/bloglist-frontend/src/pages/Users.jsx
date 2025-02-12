import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import { useUser } from '../hooks/user'
import LoginForm from '../components/LoginForm'
import BlogForm from '../components/BlogForm'
import { useRef } from 'react'
import Togglable from '../components/Togglable'
import Navigation from '../components/Navigation'
const Users = () => {
    const { user, logout } = useUser()
    const blogFormRef = useRef()

    const blogForm = () => (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm  user={user} />
      </Togglable>
    )
    // get all blogs
    const { data: blogs, isLoading, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: () => blogService.getAll()
    })
    

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    console.log('blogs', blogs)
    // group blogs by username
    const groupedBlogs = blogs.reduce((acc, blog) => {
        acc[blog.user.username] = acc[blog.user.username] || []
        acc[blog.user.username].push(blog)
        return acc
    }, {})

    if (groupedBlogs.length === 0) {
        return <div>No users found</div>
    }

    console.log('groupedBlogs', groupedBlogs)

    return (
        <div>
            <Navigation />
            <h2>Users</h2>
            {user === null ?
                <LoginForm /> :
                <div>
                    <p>{user.name} logged-in  <button onClick={logout}>logout</button></p>
                    {blogForm()}
                </div>
            }
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(groupedBlogs).map(user => (
                        <tr key={user}>
                            <td>
                                <Link to={`/users/${groupedBlogs[user][0].user.id}`}>{user}</Link>
                            </td>
                            <td>
                                {groupedBlogs[user].length} blogs
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Users
