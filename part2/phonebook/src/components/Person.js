import React from 'react'
import personService from '../services/persons'

const Person = ( {person, deleteHandler} ) => {

  return (
    <>
    <p> {person.name} {person.number} <button onClick={() => deleteHandler(person.id)}> Delete </button> </p>
    </>
  )
}


export default Person
