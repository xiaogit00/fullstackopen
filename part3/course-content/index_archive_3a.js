//  http://localhost:3001/api/persons.
const express = require('express')
var morgan = require('morgan')
const app = express()


app.use(express.json())

morgan.token('data', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :response-time :data'))


let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Marys Poppendieck",
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateID = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}



app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {

    return response.status(404).json({
      error: 'content missing'
    })
  }
  if (persons.some(person => person.name === body.name)) {
    return response.status(404).json({
      error: 'name must be unique'
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateID()
  }

  persons = persons.concat(person)
  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// app.get('/info', (request, response) => {
//   const numberofPersons = persons.length
//   const date = new Date()
//   response.send(`
//       <p>Phonebook has info for ${numberofPersons} people</p>
//       <p>${date}</p>
//   `)
// })

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
