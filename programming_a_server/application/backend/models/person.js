const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url).then(() => {
  console.log('connected to MongoDB')
}).catch(error => {
  console.log('failed to connect to MongoDB:', error.message)
})

// Define schema and model outside of the control flow
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Phone number must:
        // 1. Have length of 8 or more
        // 2. Be formed of two parts separated by -
        // 3. First part has 2 or 3 numbers
        // 4. Second part has at least 1 number
        return /^(\d{2,3})-(\d+)$/.test(v) && v.length >= 8
      },
      message: props => `${props.value} is not a valid phone number! Format: XX-XXXXXX or XXX-XXXXX`
    }
  }
})

personSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person