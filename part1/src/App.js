import React, { useState } from 'react'

const Wisdom = (props) => {

    return (
      <>
      <p>{props.randomAnecdote}</p>
      <p> has {props.vote} votes </p>
      </>
    )
}

const Button =(props) => {
  return (
    <button onClick={props.handleClick}>
    {props.text}
    </button>
  )
}

const Most = (props) => {
  return (
    <>
    <h1>Anecdote with the most votes</h1>
    <p> {props.anecdote}</p>
    <p> has {props.vote} votes </p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const next = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    // THE WHILE LOOP ENSURES THAT MY RANDOM STATE WILL
    // NEVER BE THE SAME AS MY SELECTED STATE
    while (random === selected) {
      random = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(random)

  }

  //VOTES VARIABLE IS AN OBJECT THAT CAPTURES VOTES DATA

  const [votes, setVotes] = useState({})
  const [mostVotes, setMostVotes] = useState(0)
  const vote = () => { //VOTE EVENT HANDLER WHOSE JOB IS TO INCREASE THE RIGHT VOTE ON CLICK
    const selectedVoteCount = votes[selected] || 0 // SELECT THE VOTE COUNT OF THE CURRENT SELECTED
    setVotes({   //SET THE VOTES -- THIS SYNTAX IS LIKE THIS ...arrName, [key] : value
      ...votes,
      [selected]: selectedVoteCount + 1
    })
    if (selectedVoteCount + 1 > votes[mostVotes]) {
      setMostVotes(selected)
    }

  }


  return (
    <div>
    <Wisdom selected={selected} randomAnecdote ={anecdotes[selected]} vote={votes[selected]}/>
    <Button handleClick={next} text="dispense wisdom"/>
    <Button handleClick={vote} text="vote" />
    <Most anecdote={anecdotes[mostVotes]} vote={votes[mostVotes]} />
    </div>
  )
}

export default App
