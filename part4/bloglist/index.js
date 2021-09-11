// Pseudo-code for refactor:
// 1. App, Http, Config, Logger, server, serverListen


const app = require('./app')
const http = require('http')

const cors = require('cors')


app.use(cors())

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
