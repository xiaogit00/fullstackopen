// ************************************************************************************
//*                                  Persons Component
//************************************************************************************
import React from 'react'
import Person from './Person'
//I'll need to refactor the code so that the components are in
// charge of generating the HTML for renders.
// That means that I'll be passing the unfiltered persons var into Persons
// const displayedPeople = filteredPersons.map(x => <p key={x.name}> {x.name} {x.number}</p>)
const Persons = ({persons, deleteHandler}) => {

  return (
    <>

    {persons.map((person, i) => {
      return (
        <Person person={person}
                key={i}
                deleteHandler={deleteHandler}

        />
      )
    })}
    </>
  )
}

export default Persons
