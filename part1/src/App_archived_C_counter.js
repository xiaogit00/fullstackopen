import React from 'react'

//Pseudo-code:
//1. App component expects a props object, which has property props.counter, that it will assign to variable
//counter

//2.The counter props will be assigned on call in index.JS, and the value is set to counter variable defined
// in index.js as well. 
const App = (props) => {
  const {counter} = props
  return (
    <div>{counter}</div>
  )
}

export default App
