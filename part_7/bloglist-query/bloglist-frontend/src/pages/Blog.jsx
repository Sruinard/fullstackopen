import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from '../hooks/user'
import blogService from '../services/blogs'
import { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'


const Blog = () => {
    const { id } = useParams()
    const { user } = useUser()
    const queryClient = useQueryClient()

    // set token
    useEffect(() => {
        if (user) {
            blogService.setToken(user.token)
        }
    }, [user])


    const { data: blogs, isLoading, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: () => blogService.getAll()
    })

    const likeMutation = useMutation({
        mutationFn: blogService.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        }
    })

    const commentMutation = useMutation({
        mutationFn: blogService.createComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        }
    })
    const [comment, setComment] = useState('')
    const handleLike = () => {
        likeMutation.mutate(
            {
              id: blog.id,
              title: blog.title,
              author: blog.author,
              url: blog.url,
              likes: blog.likes + 1,
              user: blog.user.id
            })
      }

    const handleComment = (e) => {
        e.preventDefault()
        commentMutation.mutate({ id: blog.id, comment: comment })
        setComment('')
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    const blog = blogs.find(blog => blog.id === id)

    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <article className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">{blog.title}</h2>
                    <div className="text-gray-600">
                        <p className="text-lg">By {blog.author}</p>
                        <a href={blog.url} className="text-black hover:underline" target="_blank" rel="noopener noreferrer">
                            {blog.url}
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">{blog.likes} likes</span>
                        <button 
                            onClick={handleLike}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            Like
                        </button>
                    </div>
                    <p className="text-gray-600">Added by {blog.user.name}</p>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Comments</h3>
                        <form onSubmit={handleComment} className="mb-6 flex gap-4">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                placeholder="Add a comment..."
                            />
                            <button 
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                Comment
                            </button>
                        </form>
                        <ul className="space-y-3">
                            {blog.comments.map(comment => (
                                <li 
                                    key={comment}
                                    className="p-4 bg-gray-50 rounded-lg text-gray-700"
                                >
                                    {comment}
                                </li>
                            ))}
                        </ul>
                    </div>
                </article>
            </div>
        </div>
    )
}
export default Blog