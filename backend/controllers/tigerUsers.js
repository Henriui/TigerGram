const bcrypt = require('bcrypt')
const TigerUserRouter = require('express').Router()
const mongoose = require('mongoose')

const TigerPost = require('../models/tigerPost');
const TigerComment = require('../models/tigerUser');
const TigerUser = require('../models/tigerUser');

// Get all tigerUsers.

TigerUserRouter.get('/', async (request, response) => {
    const users = await TigerUser
        .find({})
    response.json(users)
})

// Get tigerUser by username.

TigerUserRouter.get('/user/username=:username', async (request, response) => {
    const username = request.params.username

    const user = await TigerUser
        .findOne({ username: username })
    response.json(user)
})

// Get tigerUser by id.

TigerUserRouter.get('/user/id=:id', async (request, response) => {
    const id = request.params.id.toString()
    const user = await TigerUser
        .findById(id)
    response.json(user)
})

// Create new user. Has username, password and avatar.

TigerUserRouter.post('/', async (request, response) => {
    const { username, password, avatar } = request.body

    if (password.length < 3)
        return response.status(400).json({ error: 'password too small' })
        
    const existingUser = await TigerUser.findOne({ username })

    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newTigerUser = new TigerUser({
        _id: new mongoose.Types.ObjectId(),
        username,
        passwordHash,
        avatar
    })

    const savedUser = await newTigerUser.save()

    response.status(201).json(savedUser)
})

module.exports = TigerUserRouter
