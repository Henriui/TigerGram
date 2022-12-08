const tigerRouter = require('express').Router()
const tigerPost = require('../models/tigerPost');

tigerRouter.get('/posts', (request, response) =>{
  tigerPost.find({}).then(posts => {
    response.json(posts)
  })
})

module.exports = tigerRouter
