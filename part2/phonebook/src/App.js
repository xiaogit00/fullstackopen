// ************************************************************************************
//*                                   Exercise 2.17
//************************************************************************************
// Problem: Adding Delete Functionality

// ************************************************************************************
//*                               Initial Problem Analysis
//************************************************************************************
// 1. First, I'll need to create a button beside each name that is rendered.
// 2. Then, I need to code the delete event handler
// 3. Within the delete handler, I'll need to edit Persons module

// ************************************************************************************
//*                                  Pseudo-code
//************************************************************************************
// 1. As above.
// ************************************************************************************
//*                                  Takeaways
//************************************************************************************
// 1. You cannot use delete keyword for functions
//


// ************************************************************************************
//*                                   Exercise 2.18
//************************************************************************************
// Problem: Replacing numbers if same name but different number

// ************************************************************************************
//*                               Initial Problem Analysis
//************************************************************************************
// 1. Right now, the checking is done by running persons.some(personExists)
// 2. I'll need to check if person exists --> if exists, conduct further check for number
// 3. If number same, then create an alert
// 4. If value of alert = yes, then UPDATE number
// 5. rerender component
// ************************************************************************************
//*                                  Pseudo-code
//************************************************************************************
// 1. Create check for number numberSame




import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Persons from './components/Persons'
import Form from './components/Form'
import axios from 'axios'
import personService from './services/persons'
import './index.css'


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

  const deletePerson = (id) => {
    // console.log("delete person" + id)
    personService.deleteRecord(id)
      .then(() => {
        alert("Successfully deleted")
        setPersons(persons.filter(person => person.id !== id))
      })
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
    const numberSame = (obj) => obj.number === newNumber

    if (persons.some(personExists)) {
      if(window.confirm(`${newName} is already added to phonebook,
        replace the old number with the new one?`))
        {
          //If click replace old number with new
          const selectedID = persons.filter(person => person.name === newName)[0].id
          personService.update(selectedID, newPerson)
            .then(response => {
              setPersons(persons.map(person => person.id === selectedID ? newPerson : person))

            })
        }

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
      <Persons persons={filteredPersons}
               deleteHandler={deletePerson}

      />
    </div>
  )
}

export default App
