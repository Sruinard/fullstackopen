import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const vote = async (id) => {
    const anecdotes = await getAll()
    const anecdoteToVote = anecdotes.find(anecdote => anecdote.id === id)
    if (!anecdoteToVote) {
        throw new Error(`Anecdote with id ${id} not found`)
    }
    const newObject = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

export default { getAll, create, vote }