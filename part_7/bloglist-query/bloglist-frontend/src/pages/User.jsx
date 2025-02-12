import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useUser } from '../hooks/user'
import Navigation from '../components/Navigation'

const User = () => {
    const { id } = useParams()
    const { user } = useUser()

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

    const userBlogs = blogs.filter(blog => blog.user.id === id) 

    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{user.name}'s Blogs</h2>
                <ul className="space-y-4">
                    {userBlogs.map(blog => (
                        <li key={blog.id} className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <Link 
                                to={`/blogs/${blog.id}`}
                                className="block p-4 hover:bg-gray-50"
                            >
                                <h3 className="text-lg font-medium text-gray-900">{blog.title}</h3>
                                <p className="text-gray-600 mt-1">{blog.author}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default User
