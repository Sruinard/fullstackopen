import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'


const AnecdoteForm = ({ addNew, setNotification }) => {
  const navigate = useNavigate()

  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    }
    addNew(newAnecdote)
    navigate('/')
    setNotification(`a new anecdote ${content.value} created!`)
    setTimeout(() => setNotification(''), 5000)
    [content, author, info].forEach(field => field.reset())
  }

  const resetForm = () => {
    [content, author, info].forEach(field => field.reset())
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <div>

            <button>create</button>
            <button type='button' onClick={resetForm}>reset</button>
        </div>
      </form>
    </div>
  )

}

export default AnecdoteForm