require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const config = require('./utils/config')
const tigerApp = express()

// Routers

const tigerPostsRouter = require('./controllers/tigerPosts')
const tigerCommentsRouter = require('./controllers/tigerComments')
const tigerUsersRouter = require('./controllers/tigerUsers')
const tigerLoginRouter = require('./controllers/tigerLogin')

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Morgan logger
morgan.token('body', (req) => JSON.stringify(req.body))
tigerApp.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))

// Posts
tigerApp.use(express.json());
tigerApp.use(express.static('build'))
tigerApp.use(cors());
tigerApp.use('/users', tigerUsersRouter)
tigerApp.use('/posts', tigerPostsRouter)
tigerApp.use('/comments', tigerCommentsRouter)
tigerApp.use('/login', tigerLoginRouter)


module.exports = tigerApp
