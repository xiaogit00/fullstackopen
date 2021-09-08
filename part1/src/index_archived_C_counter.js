import ReactDOM from 'react-dom'
import App from './App'

let counter = 1

// Pseudo-code
// Index.JS provides the counter props to App, assigning it to counter variable defined

const refresh = () => {
  ReactDOM.render(
    <App counter={counter}/>,
    document.getElementById('root')
  )
}
// What does the below do?
// -setInterval is a function that takes two arguments (function, duration)
//    -Important: setInterval function *repeatedly* calls the function. No stop.
// -Here, it calls an anonymous function that rerenders page, and +1 to the counter.


setInterval(() => {
  refresh()
  counter += 1
}, 1000)
