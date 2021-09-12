const express = require('express')
const app = express()
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogsRouter')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

app.use(express.json())

logger.info('connecting to', config.MONGODB_URI)
const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
  .then(() => logger.info("connected to MongoDB"))
  .catch((error) => logger.error('error in connecting to MongoDB', error.message))

app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
module.exports = app
