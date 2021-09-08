const Course = ( {course} ) => {
  return (
    <>
    <h2>{course.name}</h2>
    {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises} </p>)}
    <p>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</p>
    </>
  )
}

const Courses = ({ courses }) => {
  return (
    <>
      <h1> Web Development Curriculum </h1>

      {courses.map(course =>
        <Course course={course} name={course.name} key={course.id}/>
      )}
    </>
  )
}

const App = () => {
  const courses = [
  {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
  {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
]

  return <Courses courses={courses} />
}

export default App
