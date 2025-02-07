import { useParams } from 'react-router-dom'

export const Anecdote = ({ anecdotes }) => {
    const { id } = useParams()
    const anecdote = anecdotes.find(a => a.id === Number(id))
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <p>has {anecdote.votes} votes</p>
            <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
        </div>
    )
}