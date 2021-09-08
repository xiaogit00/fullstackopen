// ************************************************************************************
//*                                   Exercise 2.16
//************************************************************************************
// Problem: Refactor backend interactions into another module

// ************************************************************************************
//*                               Initial Problem Analysis
//************************************************************************************
// Backend interactions is currently done via useEffect as well as
// within the else statement of the add event handler
//
// I'll need to create a person service first.

// ************************************************************************************
//*                                  Pseudo-code
//************************************************************************************
// 1. Create a persons.js services
// 2. Define those functions within persons.js, export them
// 3. Within App.js, import personsService
// 4. Within App component, replace Axios parts with calls to personService


import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Persons from './components/Persons'
import Form from './components/Form'
import axios from 'axios'
import personService from './services/persons'


// ************************************************************************************
//*                                  App Component
//************************************************************************************
const App = () => {

  // ********************|
  //*   State Variables *|
  //*********************|
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')

  // ********************|
  //*   Fetching Data   *|
  //*********************|
  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  },[])


  // console.log(promise.then(response => setPersons(response.data))
  // console.log('persons', persons)


  // ********************|
  //*   Event Handlers  *|
  //*********************|
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const add = (event) => {
    event.preventDefault()
    // console.log('addName triggered')
    const newPerson = {
      name: newName,
      number: newNumber
    }
//
    const personExists = (obj) => obj.name === newName //returns True if already exist

    if (persons.some(personExists)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      personService.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })

    }
  }
  // ********************|
  //*   Filter          *|
  //*********************|

  const filteredPersons = search === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search))

  const displayedPeople = filteredPersons.map(x => <p key={x.name}> {x.name} {x.number}</p>)

  // ********************|
  //*         JSX       *|
  //*********************|
  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={search} handle={handleSearchChange}/>

      <Form submitHandler={add}
            nameInput={newName}
            nameHandle={handleNameChange}
            numberInput={newNumber}
            numberHandle={handleNumberChange}
      />


      <h2>Numbers</h2>
      <Persons persons={displayedPeople}/>
    </div>
  )
}

export default App
