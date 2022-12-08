const tigerPostsRouter = require('express').Router()
const tigerUser = require('../models/tigerUser')
const bcrypt = require('bcrypt')

tigerPostsRouter.get('/', async (request, response) => {
    const users = await tigerUser
      .find({})
      .populate('tigerPost', { image: 1, tiger: 1 })
  
    response.json(users)
  })

tigerPostsRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const tiger = new tigerUser({
        username,
        name,
        passwordHash,
    })
    })