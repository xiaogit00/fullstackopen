import React, { useState, useEffect } from 'react'
import axios from 'axios'

//Ex 2.11: Initial state of the data to be fetched using server.

//High level logic: Right now, the data is hard coded in the App component
// under the persons state variable.

//Ideally, what happens is this:
// Import useEffect,
// Within App component:
// -create a persons state variable which is an array
// -Write the effect hook
const Search = ({ value, handle }) => {
  return (
    <>
      <p>Filter shown with:
        <input value={value} onChange={handle}/>
      </p>
    </>
  )
}

const Form = (props) => {
  return (
    <form onSubmit={props.submitHandler}>
      <div>
        name: <input value={props.nameInput} onChange={props.nameHandle}/>
      </div>
      <div>
        number: <input value={props.numberInput} onChange={props.numberHandle}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <>
    {props.persons}
    </>
  )
}

const App = () => {
  // STATE FIELDS
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')

  //EFFECT hook
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])
  // EVENT HANDLERS
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }
//Add eventhandler
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
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }
  //END add eventhandler

  const filteredPersons = search === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search))

  const displayedPeople = filteredPersons.map(x => <p key={x.name}> {x.name} {x.number}</p>)

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
