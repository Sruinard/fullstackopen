import { useState } from 'react'
import { UPDATE_AUTHOR } from '../mutations'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import { useNavigate } from 'react-router-dom'

const Author = () => {
  const [born, setBorn] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const { data, loading } = useQuery(ALL_AUTHORS)
  const navigate = useNavigate()
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })


  const handleSubmit = (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name: selectedAuthor, born: parseInt(born) } })
    setSelectedAuthor(null)
    setBorn('')
    navigate('/authors')
  }
  if (loading) return <div>loading...</div>

  return <div>
    Author
    <select name="" id="" onChange={({ target }) => setSelectedAuthor(target.value)}>
      {data.allAuthors.map(author => (
        <option key={author.name} value={author.name}>{author.name}</option>
      ))}
    </select>
    <form onSubmit={handleSubmit}>
        <div>
            <label>
                Born
                <input type="number" value={born} onChange={({ target }) => setBorn(target.value)} />
            </label>
        </div>
        <button type="submit">Update author</button>
    </form>

  </div>
}

export default Author
