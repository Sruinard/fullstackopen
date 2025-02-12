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

    return <div>
        <Navigation />
        <h2>{blog.title}</h2>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={handleLike}>like</button></p>
        <p>added by {blog.user.name}</p>
        <form onSubmit={handleComment}>
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button type="submit">add comment</button>
        </form>
        <h3>comments</h3>
        <div>
            <ul>
                {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
            </ul>
        </div>
    </div>
}
export default Blog