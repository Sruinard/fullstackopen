import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
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

  return <div style={blogStyle}>
    <Link to={`/blogs/${blog.id}`}>
      {blog.title} {blog.author}
    </Link>
  </div>
}

export default Blog