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
        <div className="min-h-screen bg-white">
            <Navigation />
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Users</h2>
                {user === null ? (
                    <LoginForm />
                ) : (
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-600">
                                {user.name} logged-in
                            </p>
                            {blogForm()}
                        </div>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Username
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Blogs created
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Object.keys(groupedBlogs).map(user => (
                                <tr key={user} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link 
                                            to={`/users/${groupedBlogs[user][0].user.id}`}
                                            className="text-black hover:underline"
                                        >
                                            {user}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                        {groupedBlogs[user].length} blogs
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Users
