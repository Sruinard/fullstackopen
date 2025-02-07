import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    console.log('getAll')
    try {
        const { data } = await axios.get(baseUrl)
        return data
    } catch (error) {
        console.error('Error fetching anecdotes:', error)
        throw error
    }
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const { data } = await axios.post(baseUrl, object)
    return data
}

const vote = async (id) => {
    const {data: anecdote} = await axios.get(`${baseUrl}/${id}`)
    console.log('anecdote', anecdote)
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const {data} = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return data
}
export default { getAll, createNew, vote }