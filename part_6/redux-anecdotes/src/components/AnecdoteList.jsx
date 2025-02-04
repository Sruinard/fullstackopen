import { useSelector, useDispatch } from 'react-redux'
import {incrementVote } from '../reducers/anecdoteReducer'
const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes).sort((a, b) => b.votes - a.votes);
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(incrementVote(id))
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