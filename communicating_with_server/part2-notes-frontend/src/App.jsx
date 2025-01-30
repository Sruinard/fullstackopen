import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonService from "./services/persons"



const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const hook = () => {
    PersonService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }
  useEffect(hook, [])


  const addName = (event) => {
    event.preventDefault()
    console.log(event.target)
    if (persons.find(person => person.name === newName)) {
      if (!window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        return;
      } else {
        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, number: newNumber}
        PersonService.update(changedPerson.id, changedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
        })
        setNewName('')
        return;
      }
    }
    const Person = {
      name: newName,
      number: newNumber
    }

    PersonService.create(Person).then(Person => {
      setPersons(persons.concat(Person))
      setNewName('')
    })
  }

  const deletePerson = (id) => {

    if (!window.confirm(`Are you sure you want to delete ${persons.find(person => person.id === id).name}?`)) {
      return;
    }

    PersonService.deletePerson(id).then(
      setPersons(persons.filter(person => person.id !== id))
    )
  }

  const filteredPersons = filterName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName}/>
      <h2>Numbers</h2>
      <PersonForm addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App