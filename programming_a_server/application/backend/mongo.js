const mongoose = require('mongoose')

// Define schema and model outside of the control flow
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Helper function to connect to MongoDB
const connectToMongoDB = (password) => {
  const url = `mongodb+srv://ruinard:${password}@cluster0.ccsuj.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`
  mongoose.set('strictQuery', false)
  return mongoose.connect(url)
}

// Handle different command line argument cases
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} 

const password = process.argv[2]

if (process.argv.length === 3) {
  console.log("getting all persons...")
  connectToMongoDB(password)
    .then(() => {
      return Person.find({})
    })
    .then(persons => {
      persons.forEach(person => console.log(person.name, person.number))
      mongoose.connection.close()
    })
    .catch(error => {
      console.error('Error:', error)
      mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  connectToMongoDB(password)
    .then(() => {
      const person = new Person({
        name,
        number,
      })
      return person.save()
    })
    .then(() => {
      console.log('person saved!')
      mongoose.connection.close()
    })
    .catch(error => {
      console.error('Error:', error)
      mongoose.connection.close()
    })
} else {
  console.log("too many arguments")
  process.exit(1)
}
