import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebok, replace old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number : newNumber}

        personService
          .update(person.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.name !== newName ? person: returnedPerson))
              setError(false)
              setNotificationMessage(`Replaced phonenumber for ${newName}`)
              timeoutNotification()
            })
            .catch(error => {
              setError(true)
              setNotificationMessage(`Information of ${newName} has already been removed from server`)
              timeoutNotification()
            })
      }
    } else {
      const personObject = {
        name : newName,
        number : newNumber,
      }
      personService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setError(false)
          setNotificationMessage(`Added ${newName}`)
          timeoutNotification()
        })
      
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => {
    const name = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${name} ?`)) {
      personService
      .remove(id)
        .then(setPersons(persons.filter(person => person.id !==id)))
        setError(false)
        setNotificationMessage(`Removed ${name}`)
        timeoutNotification()  
    }
  }

  const timeoutNotification = () => {
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  } 

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = newFilter === '' 
  ? persons 
  : persons.filter(person => person.name.slice(0, newFilter.length).toLowerCase() === newFilter.toLowerCase())


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} error={error} />
      <Filter filterText={newFilter} filterHandler={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm personAdder={addPerson} nameToBeAdded={newName} nameHandler={handleNameChange} numberToBeAdded={newNumber} numberHandler={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons personsFiltered={personsToShow} removePerson={removePerson} />
    </div>
  )

}

export default App