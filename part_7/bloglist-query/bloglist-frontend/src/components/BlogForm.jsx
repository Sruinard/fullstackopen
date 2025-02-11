import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { useNotificationDispatch } from './NotificationContext'
import blogService from '../services/blogs'

const BlogForm = ({ user }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const mutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `blog ${newBlog.title} created`
      })
    },
    onError: (error) => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: error.response.data.error
      })
    }
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitNewBlog = (event) => {
    event.preventDefault()
    mutation.mutate({
      title: title,
      author: author,
      url: url,
      likes: 0,
      user: user.id
    })
  }
  return (
    <form onSubmit={submitNewBlog}>
      <div>
        title:
        <input
          type='text'
          value={title}
          name='Title'
          id='blog-title-input'
          data-testid='input-title'
          onChange={({ target }) => setTitle(target.value)}
        ></input>
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='Author'
          id='blog-author-input'
          data-testid='input-author'
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          name='Url'
          data-testid='input-url'
          id='blog-url-input'
          onChange={({ target }) => setUrl(target.value)}
        ></input>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm