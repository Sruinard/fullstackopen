import { useState, useEffect } from 'react'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
      .catch(error => {
        showNotification('Error fetching data from server', 'error')
      })
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName.trim(),
      number: newNumber.trim(),
    }

    if (!nameObject.name || !nameObject.number) {
      showNotification('Name and number are required', 'error')
      return
    }

    const existingPerson = persons.find(person => person.name.toLowerCase() === nameObject.name.toLowerCase())

    if (existingPerson) {
      const msg = `${nameObject.name} is already added to the phonebook. Replace the old number with the new one?`
      if (window.confirm(msg)) {
        updateName(existingPerson.id, nameObject)
      }
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          resetNewState()
          showNotification(`Added ${returnedPerson.name}`)
        })
        .catch(error => {
          showNotification(`Error adding ${nameObject.name}: ${error.response?.data?.error || 'Unknown error'}`, 'error')
        })
    }
  }

  const updateName = (id, nameObject) => {
    personService
      .update(id, nameObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        resetNewState()
        showNotification(`Updated ${returnedPerson.name}'s number`)
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          showNotification(`Information of ${nameObject.name} has already been removed from server`, 'error')
          setPersons(persons.filter(p => p.id !== id))
        } else {
          showNotification(`Error updating ${nameObject.name}: ${error.response?.data?.error || 'Unknown error'}`, 'error')
        }
      })
  }

  const deleteName = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          showNotification(`Deleted ${person.name}`, 'delete')
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            showNotification(`Information of ${person.name} has already been removed from server`, 'error')
            setPersons(persons.filter(p => p.id !== person.id))
          } else {
            showNotification(`Error deleting ${person.name}: ${error.response?.data?.error || 'Unknown error'}`, 'error')
          }
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const resetNewState = () => {
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = newFilter
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={notification?.message} type={notification?.type} />
      <div>
        Filter shown with: <input type="text" value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>Add new contact</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input type='text' value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input type='text' value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => (
          <Person
            key={person.id}
            person={person}
            deleteEntry={() => deleteName(person)}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
