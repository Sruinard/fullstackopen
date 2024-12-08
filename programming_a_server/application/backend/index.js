require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require("./models/person")

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
app.use(express.static('dist'))
// Modify morgan format to include POST data
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

app.get('/', (request, response) => {
  response.send('<h1>Hello Persons!</h1>')
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`
      <div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
      </div>
    `)
  }
  ).catch(error => {
    return response.status(404).end()
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
  
    if (!body.number || !body.name) {
      return response.status(400).json({ 
        error: 'missing number and/or name' 
      })
    }

    Person.findOne({ name: body.name })
      .then(existingPerson => {
        console.log("Existing Person:", existingPerson)
        if (existingPerson) {
          return response.status(400).json({ 
            error: 'name must be unique' 
          })
        }

        const newPerson = new Person({
          name: body.name,
          number: body.number
        })

        return newPerson.save()
      })
      .then(savedPerson => {
        return response.status(201).json(savedPerson)
      }).catch(error => {
        next(error)
      })
})

app.put('/api/persons/:id', async (request, response) => {
  const {name, number} = request.body
  const id = request.params.id


  const delta = {
    "name": name,
    "number": number
  }

  Person.findByIdAndUpdate(
    id, 
    delta, 
    {"new": true, runValidators: true, context: 'query' }
  ).then(
    updated => {
      return response.json(updated)
    }
  ).catch(error => {
    console.log(error.response.data.error)
    return next(error)
  }
  )
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})