import { useDispatch } from 'react-redux'
import { newAnecdote, setNotificationWithTimeout } from '../reducers/anecdoteReducer'
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(newAnecdote(content))
        dispatch(setNotificationWithTimeout(`you created '${content}'`, 5))
        event.target.anecdote.value = ''
    }

    return (
    <>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name='anecdote'/></div>
      <button type='submit'>create</button>
    </form>
    </>
    )
}

export default AnecdoteForm