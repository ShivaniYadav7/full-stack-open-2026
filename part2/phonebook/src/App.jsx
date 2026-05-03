import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas', 
      number: '0000000',
    }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const alreadyExists = persons.some(person => (person.name === newName || person.number === newNumber))

    if(alreadyExists) {
      alert(`${newName} or ${newNumber} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    
    const personObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  
  const personsToShow = searchName === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(searchName.toLowerCase())
    )


    const search = (event) => {
      event.preventDefault()
      persons.filter(person => {person.name.startsWith(searchName)})
    }

  return(
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit = {search}>
        <p>filter shown with
        <input value={searchName} onChange={handleSearchName}/>
      </p>
      </form>
      <h2>add a new</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <p key={person.name}>{person.name}  {person.number}</p>
      )}

    </div>
  )
}

export default App