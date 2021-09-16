const express = require('express')
const app = express()
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

app.use(express.json())

logger.info('connecting to', config.MONGODB_URI)
const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
    .then(() => logger.info('connected to MongoDB'))
    .catch((error) => logger.error('error in connecting to MongoDB', error.message))

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app
