import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showDetails, setShowDetails] = useState(false)

  const isSameUser = (blog.user.id === user.id)
  const queryClient = useQueryClient()
  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      console.error('Failed to update blog:', error)
    }
  })
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      console.error('Failed to delete blog:', error)
    }
  })

  const handleDeleteBlog = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlogMutation.mutate(blog.id)
      return blog
    }
  }

  const handleUpdateBlog = () => {
    updateBlogMutation.mutate(
        {
          id: blog.id,
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes + 1,
          user: blog.user.id
        })
  }
  return <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={() => { setShowDetails(!showDetails) }}>{showDetails ? 'hide' : 'view'}</button>
    {showDetails && <div>
      {blog.url} <br />
      likes: {blog.likes}
      <button onClick={handleUpdateBlog}>like</button>
      <div>
        {blog.user.id === user.id ? `You` : `User ${blog.user.id}`}
      </div>
      {isSameUser && <button onClick={handleDeleteBlog}>remove</button>}
    </div>
    }
  </div>
}

export default Blog