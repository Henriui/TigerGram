const tigerPostsRouter = require('express').Router()

const TigerPost = require('../models/tigerPost');
const TigerComment = require('../models/tigerUser');
const TigerUser = require('../models/tigerUser');

// Get all tigerposts

// TODO:

// Get tigerPost by :id

// TODO:

// Add new tigerPost

// TODO:

// Delete tigerpost by :id

tigerPostsRouter.delete('/:id', async (request, response) => {
  await TigerPost.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// Edit tigerPost ()

// TODO:

module.exports = tigerPostsRouter
