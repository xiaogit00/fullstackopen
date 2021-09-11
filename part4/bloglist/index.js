// Pseudo-code for refactor:
// 1. App, Http, Config, Logger, server, serverListen


const app = require('./app')
const http = require('http')

const cors = require('cors')


app.use(cors())


app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
