const bcrypt = require('bcrypt')
const TigerUserRouter = require('express').Router()
const TigerUser = require('../models/tigerUser')

// Get all tigerUsers and posts.

TigerUserRouter.get('/', async (request, response) => {
    const users = await TigerUser
        .find({})
        .populate('tigerPost', { image: 1, tiger: 1 })

    response.json(users)
})

// Create new user. Has username, password and avatar.

TigerUserRouter.post('/', async (request, response) => {
    console.log('request.body', request.body)
    const { username, password, avatar } = request.body

    const existingUser = await TigerUser.findOne({ username })

    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newTigerUser = new TigerUser({
        username,
        passwordHash,
        avatar
    })

    const savedUser = await newTigerUser.save()

    response.status(201).json(savedUser)
})

module.exports = TigerUserRouter
