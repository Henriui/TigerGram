const tigerRouter = require('express').Router()
const tigerPost = require('../models/tigerPost');

const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

tigerRouter.get('/posts', async (request, response) =>{
  const post = await tigerPost
  .find({})
  .populate('')
   response.json(post)
  
})

module.exports = tigerRouter
