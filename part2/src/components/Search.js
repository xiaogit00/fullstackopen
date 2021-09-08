// ************************************************************************************
//*                                  Search Component
//************************************************************************************
import React from 'react'

const Search = ({ value, handle }) => {
  return (
    <>
      <p>Filter shown with:
        <input value={value} onChange={handle}/>
      </p>
    </>
  )
}

export default Search
