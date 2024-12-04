const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Create custom token for POST data
morgan.token('postData', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

app.use(express.json())
app.use(cors())
// Modify morgan format to include POST data
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hello Persons!</h1>')
})

app.get('/info', (request, response) => {
  response.send(`
    <div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    </div>
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  person = persons.find(person => person.id === request.params.id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter(person => person.id !== request.params.id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.number || !body.name) {
      return response.status(400).json({ 
        error: 'missing number and/or name' 
      })
    }

    if (persons.find(person => person.name === body.name)) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
 

    let id = Math.round(Math.random() * 1000000).toString()
  
    const person = {
      name: body.name,
      number: body.number || false,
      id: id,
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})