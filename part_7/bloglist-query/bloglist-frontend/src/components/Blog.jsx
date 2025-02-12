import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
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

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-sm transition-shadow">
      <Link 
        to={`/blogs/${blog.id}`}
        className="block"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 hover:text-black">
              {blog.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              by {blog.author}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            {blog.likes} likes
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Blog