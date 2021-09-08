import React, { useState } from 'react'

//Okay. I've got a simple problem. I'll need to input the name, and render them into numbers.

//Ex2.6 [High level logic] Which means, using what I know, I would need to:
//1. save the name into a state
//2. Write an eventHandler that is triggered onSubmit
//3. Eventhandler calls setPersons, hence rendering person name on page

//Ex2.6 Pseudo-code:
//1. First, newName state is used to capture input.
//2. The input field needs to have a value attribute, which I will set to newName.
//3. I would need to capture keystrokes - this is done via an onChange event handler
//4. The handleChange event handler will need to capture every keystroke (done), set the
//   event.target.value (input in the box) to the setNewName
//5. Add an event handler to Add button
//6. Event handler does two things: 1)adds name to persons state; 2)resets field
//   (1) is done via creating a new object, then concating it. setPersons(persons.concat)
//   (2) is done setting newName to be ''
//7. Show the names under numbers. Persons are saved as an object. I'll need to use map to
//   create multiple elements.
//*********************************************************************************
//Ex 2.7: Preventing user from being able to add names:
// [High level logic]: I'll compare newName with items in persons object and if it exists,
// return an alert

//Ex 2.7 Pseudo-Code:
// 1. I'll need to add this validation into addNames event handler
// 2. I feel like includes method might be right. Let's see how I can implement this.
// 3. persons is an array of objects. Might try: persons.includes(newPerson)
// 4. includes didn't work, for some reason. I used Some instead.

//*********************************************************************************

//Ex 2.8 [High level logics] - I'll need to add a number, and then the number needs to
// display the portion below.
//
// Ex2.8 Pseudo-code
// 1.I'll need to add a number field within persons object [DONE]
// 2. A newNumber state field to capture input [DONE]
// 3. Adjust the add event handler to addNumber too
// 4. Add a new input field in JSX to capture number
// 5. Add new numberChange event handler [DONE]

//*********************************************************************************

// Ex 2.9: Higher Level Logics
// I'll need to implement a search bar. The main logic of the search bar is to create a new state.
//  And then, create a function which only shows the names that match the search

// Ex 2.9 Pseudo-Code
// 1. Add an input bar [Done]
// 2. Create a new state field: search [Done]
// 3. Write the variable function searchFilter that displays only fields found, make sure it's
//  not case sensitive[Done]
// 4. Attach the function to an event handler

//*********************************************************************************

// Ex 2.10: Refactoring
// Higher level logics: Keep app state and all event handlers in App component
// 4 Components: Search, form, all rendering component, single person rendering
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')

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
