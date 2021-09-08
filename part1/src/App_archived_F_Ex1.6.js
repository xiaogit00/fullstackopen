import React, { useState } from 'react'

//I would need a couple of components
//1. Button component
//2. Then a display component

//Pseudo-code of the app:
// Using the useState() to set the variables - good, neutral, bad.
// I would need event handlers:
// onClick, then setGood, or whatever, etc.
const Button =(props) => {

  return (
    <button onClick={props.handleClick}>
    {props.text}
    </button>
  )
}

const Statistic = (props) => {

  return(
    <>
      <td>{props.text} </td>
      <td>{props.value} </td>
    </>
)
}

const Statistics =(props) => {
  if (props.total === 0 ) {
    return "No Feedback Given"
  }
  return (
    <>
    <table>
      <tbody>
        <tr><Statistic text="good" value={props.good} /></tr>
        <tr><Statistic text="neutral" value={props.neutral} /></tr>
        <tr><Statistic text="bad" value={props.bad} /></tr>
        <tr><Statistic text="average" value={props.average} /></tr>
        <tr><Statistic text="positive" value={props.positive} /></tr>
      </tbody>
    </table>
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const goodPlus = () => {
    setGood(good+1)
    setTotal(total+1)
  }
  const neutralPlus = () => {
    setNeutral(neutral+1)
    setTotal(total+1)
  }
  const badPlus = () => {
    setBad(bad+1)
    setTotal(total+1)
  }

  let average = (good - bad)/total;
  let positive = good/total;


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodPlus} text="good" />
      <Button handleClick={neutralPlus} text="neutral" />
      <Button handleClick={badPlus} text="bad" />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        positive={positive}
        total={total}
      />
    </div>
  )
}

export default App
