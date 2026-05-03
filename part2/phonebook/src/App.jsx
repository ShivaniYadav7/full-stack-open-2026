import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

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

      <Filter search={search} searchName={searchName} handleSearchName={handleSearchName}/>

      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>

    </div>
  )
}

export default App