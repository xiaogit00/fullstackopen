import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
    return state
  }
}

const store = createStore(counterReducer)

const App = () => {

  return (
    <div style={{margin: "30px"}}>

      {store.getState()}
      <div>
      <button onClick={e => store.dispatch({type:'INCREMENT'})}>+</button>
      <button onClick={e => store.dispatch({type:'DECREMENT'})}>-</button>
      <button onClick={e => store.dispatch({type:'ZERO'})}>zero</button>
      </div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
