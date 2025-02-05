import { useSelector, useDispatch } from 'react-redux'
const AnecdoteList = () => {
    const anecdotes = [...useSelector(state => state.anecdotes)].sort((a, b) => b.votes - a.votes);
    console.log(anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch({
          type: 'anecdotes/vote',
          payload: { id }
        })
      }

    const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

    return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList