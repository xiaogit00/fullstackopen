const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info, error
}

//What is this syntax?

//Okay, info prints normal log messages; error for error messages

//
