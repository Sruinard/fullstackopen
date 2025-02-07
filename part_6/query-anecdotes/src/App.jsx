import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import anecdotesService from './requests/anecdotes'
import { useNotificationDispatch } from './components/NotificationContext'

const App = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: anecdotesService.vote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `anecdote ${updatedAnecdote.content} voted`
      })
    }
  })

  const handleVote = (anecdote) => {
    mutation.mutate(anecdote.id)
  }

  const {data: anecdotes, isLoading, isError, error} = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
    retry: 1,
    retryDelay: 1000,
    refetchOnMount: false,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      <Notification />
      <AnecdoteForm />
      {anecdotes && anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
