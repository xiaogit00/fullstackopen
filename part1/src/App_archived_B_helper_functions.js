//This Hello component gets an Age prop and calculates the age by calling a function.
//Quite a classic function definition, at the beginning of a component.

//THUS: the structure of a component is: 1) Function definition 2) component render + function call
const Hello = (props) => {
  const name = props.name
  const age = props.age

  const bornYear = () => new Date().getFullYear() - age

//Logic:
//1) a function expression bornYear(), which returns yearNow - props.age
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p> So you were probably born in {bornYear()}</p>
    </div>
  )
}
