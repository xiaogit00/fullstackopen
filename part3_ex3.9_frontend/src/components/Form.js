// ************************************************************************************
//*                                  Form Component
//************************************************************************************
import React from 'react'


const Form = (props) => {
  return (
    <form onSubmit={props.submitHandler}>
      <div>
        name: <input value={props.nameInput} onChange={props.nameHandle}/>
      </div>
      <div>
        number: <input value={props.numberInput} onChange={props.numberHandle}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form
