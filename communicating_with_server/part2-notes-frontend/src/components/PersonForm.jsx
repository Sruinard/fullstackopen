const PersonForm = ({ addName, newName, setNewName, newNumber, setNewNumber }) => {
    return (
      <form  onSubmit={addName}>
        <div> name: <input id="name-input" value={newName} onChange={event => setNewName(event.target.value)} /> </div>
        <div>number: <input id="number" value={newNumber} onChange={event => setNewNumber(event.target.value)}/></div>
        <div> <button type="submit">add</button> </div>
      </form>
    )
}

export default PersonForm;