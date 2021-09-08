import React, { useState } from 'react'   //useState is a function

const App = () => {
  const [ counter, setCounter ] = useState(0) //does a function call; function returns an array of 2 items
                                              // which we assign to counter and setCounter
                                              // -counter assigned to initial value of state which is 0
                                              // -setCounter assigned to function that'll be used to modify state
                                              //
  setTimeout( () => setCounter(counter + 1),    1000  )
  console.log('rendering', counter)
  return (
    <div>{counter}</div>
  )
}

export default App
