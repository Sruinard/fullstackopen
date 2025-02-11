import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../requests/anecdotes'
import { useNotificationDispatch } from './NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const mutation = useMutation({
    mutationFn: anecdotesService.createNew,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `anecdote ${newAnecdote.content} created`
      })
    },
    onError: (error) => {
        notificationDispatch({
          type: 'SET_NOTIFICATION',
          payload: error.response.data.error
        })
      }
  })

  const onCreate = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      console.log('new anecdote')
      mutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
