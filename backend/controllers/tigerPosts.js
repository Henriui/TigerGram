const tigerRouter = require('express').Router()
const tigerPost = require('../models/tigerPost');


tigerRouter.get('/tigerUsers', async (request, response) =>{
  const post = await tigerPost
  .find({})
  .populate('')
   response.json(post)
  
})

module.exports = tigerRouter
