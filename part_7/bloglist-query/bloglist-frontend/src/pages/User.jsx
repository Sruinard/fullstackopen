import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useUser } from '../hooks/user'

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
        <div>
            <h2>{user.name}</h2>
            <ul>
                {userBlogs.map(blog => (
                    <Link to={`/blogs/${blog.id}`} key={blog.id}>
                        <li key={blog.id}>{blog.title}</li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default User
