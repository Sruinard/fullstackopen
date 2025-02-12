import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { useNotificationDispatch } from './NotificationContext'
import blogService from '../services/blogs'

const BlogForm = ({ user }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const mutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `blog ${newBlog.title} created`
      })
      setTitle('')
      setAuthor('')
      setUrl('')
    },
    onError: (error) => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: error.response.data.error
      })
    }
  })

  const submitNewBlog = (event) => {
    event.preventDefault()
    mutation.mutate({
      title,
      author,
      url,
      likes: 0,
      user: user.id
    })
  }

  return (
    <div>
      <p className="text-gray-600 mb-6">Share your favorite blog with others</p>
      <form onSubmit={submitNewBlog} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            placeholder="Enter blog title"
            onChange={({ target }) => setTitle(target.value)}
            data-testid="input title"
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#10a37f] focus:ring-1 focus:ring-[#10a37f] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            placeholder="Enter author name"
            onChange={({ target }) => setAuthor(target.value)}
            data-testid="input author"
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#10a37f] focus:ring-1 focus:ring-[#10a37f] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            placeholder="Enter blog URL"
            onChange={({ target }) => setUrl(target.value)}
            data-testid="input url"
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#10a37f] focus:ring-1 focus:ring-[#10a37f] transition-colors"
          />
        </div>
        <div className="flex gap-3">
          <button 
            type="submit"
            className="flex-1 py-3 px-6 bg-[#10a37f] text-white text-sm font-medium rounded-lg hover:bg-[#1a7f64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a37f] transition-colors"
          >
            Create Blog
          </button>
          <button 
            type="button"
            onClick={() => {
              setTitle('')
              setAuthor('')
              setUrl('')
            }}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a37f] transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm