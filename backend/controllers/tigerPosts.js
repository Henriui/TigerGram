const tigerPostsRouter = require('express').Router()

const TigerPost = require('../models/tigerPost');
const TigerUser = require('../models/tigerUser');
const TigerComment = require('../models/TigerComment');

// Get all tigerposts

tigerPostsRouter.get('/', async (request, response) => {
  const tigerPosts = await TigerPost
    .find({})
    .populate('TigerUser', { username: 1, avatar: 1 })
  .populate('TigerComment', {TigerUser: 1, TigerComment: 1})
  response.json(tigerPosts)
})

// Get tigerPost by :id

tigerPostsRouter.get('/:id', async (request, response) => {
  const tigerPost = await TigerPost.findById(request.params.id)

  if (tigerPost) {
    response.json(tigerPost.toJSON())
  } else {
    response.status(404).end()
  }
})

// Add new tigerPost

tigerPostsRouter.post('/', async (request, response) => {
  const body = request.body
  const tigerUser = await TigerUser.findById(body.userId)

  const newTigerPost = new TigerPost({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: tigerUser._id
  })

  const savedTigerPost = await newTigerPost.save()
  tigerUser.tigerPosts = tigerUser.tigerPosts.concat(newTigerPost._id)
  await tigerUser.save()

  response.status(201).json(savedTigerPost)
})

// Delete tigerpost by :id

tigerPostsRouter.delete('/:id', async (request, response) => {
  await TigerPost.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// Edit tigerPost ()

tigerPostsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const tigerPost = {
    content: body.content,
    important: body.important,
  }

  TigerPost.findByIdAndUpdate(request.params.id, tigerPost, { new: true })
    .then(updatedPost => {
      response.json(updatedPost)
    })
    .catch(error => next(error))
})

module.exports = tigerPostsRouter
