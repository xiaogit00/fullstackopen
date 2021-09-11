const express = require('express')
const app = express()
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogsRouter')
const mongoose = require('mongoose')

app.use(express.json())

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
  .then(() => console.log("connected to MongoDB"))


app.use('/api/blogs', blogsRouter)

module.exports = app
