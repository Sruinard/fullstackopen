



const Persons = ({filteredPersons, deletePerson}) => {
    return <> {filteredPersons.map(person =><div key={person.id}> <p>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></p> </div>)} </>
}

export default Persons;