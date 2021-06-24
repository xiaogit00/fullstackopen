import React from 'react'

const Header = (props) => (  //rendering name of course
  <p>{props.course}</p>
)

const Part = (props) => (
  <p>{props.content} / {props.total}</p>
)  //Each component is like a template, with props as placeholders.

const Content = () => {  //rendering parts and number of exercises
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
return (
  <div>
   <Part content={part1} total={exercises1}/>
   <Part content={part2} total={exercises2}/>
   <Part content={part3} total={exercises3}/>
   </div>
)}



const Total = (props) => ( //renders total number of exercises
  <p>{props.total}</p>
)

const App = () => {  //All data still resides in the App component,
                      //which passes the necessary data to each component using props.
  const course = 'Half Stack application development'

  return (
    <div>
    <Header course={course}/>
    <Content/>
    </div>
  )
}

export default App


// Ex 1.1
//
// const App = () => {  //All data still resides in the App component,
//                       //which passes the necessary data to each component using props.
//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14
//
//   return (
//     <div>
//     <Header course={course}/>
//     <Content content={part1}/>
//     <Total total={exercises1}/>
//     <Content content={part2}/>
//     <Total total={exercises2}/>
//     <Content content={part3}/>
//     <Total total={exercises3}/>
//     </div>
//   )
// }
//
// export default App
