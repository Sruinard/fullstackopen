import React from 'react'

const Person = ({ person, deleteEntry }) => {
  return (
    <li>{person.name} {person.number}&nbsp;
    <button onClick={deleteEntry}>delete</button></li>
  )
}

export default Person
