import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios'
import numberService from './services/numberService'

const App = (props) => {
  const [persons, setPersons] = useState([])

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

  useEffect (() => {
    numberService
     .getAll()
     .then((response) => {
      setPersons(response)
     })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const alreadyExists = persons.find(person => person.name === newName )
    const personObject = { name: newName, number: newNumber }

    if(alreadyExists) {
      if(window.confirm(`${newName} is already added to phonebook, do you want to update the old number?`)) {
        numberService
          .update(alreadyExists.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== alreadyExists.id ? p : returnedPerson))

            setNewName('')
            setNewNumber('')
          })
        }
      }
      else {
        numberService
          .create(personObject) 
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name}?`)) {
      numberService
        .deleteNum(id)      
        .then(() => {
        setPersons(persons.filter(p => p.id !== id))
    })
    }
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
      <Persons personsToShow={personsToShow} delete={deletePerson}/>

    </div>
  )
}

export default App