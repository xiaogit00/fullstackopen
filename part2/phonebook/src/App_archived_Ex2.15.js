// ************************************************************************************
//*                                   Exercise 2.15
//************************************************************************************
// Problem: Save phonebook data into backend server

// ************************************************************************************
//*                               Initial Problem Analysis
//************************************************************************************
// Higher level logic: PART 1: Reading Data
// 1. I'll need to create a json.server.
// 2. Let's say the Json server has a couple of values
// 3. I'll need to Read, Write, from the JSON server

// Part 2: Writing Data
// 1. I'll need to create an object for persons
// 2. using axios.post to post data, and then setPersons
// ************************************************************************************
//*                                  Pseudo-code
//************************************************************************************
// PART 1: READING DATA
// 1. Json server done + values done:
// 2. To read:
//  -Import axios
//  - fire up local server
//  -Call axios.get('url') to create promise object
//  -Call then to get response data.
// 3. To display the data: I will need to use effectHook.
// Basically make a call via promise within effectHook,
// and setPersons state to be response.data.
//
// PART 2: Writing Data
// 1. Create a person Object within add controller
// 2. Within add controller, post the data via axios


import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Persons from './components/Persons'
import Form from './components/Form'
import axios from 'axios'





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
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
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
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(newPerson))
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
