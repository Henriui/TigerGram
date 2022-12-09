const tigerCommentsRouter = require('express').Router()

const TigerPost = require('../models/tigerPost');
const TigerComment = require('../models/tigerUser');
const TigerUser = require('../models/tigerUser');

// Add new tigerComment

tigerCommentsRouter.post('/', async (request, response) => {
    const body = request.body
    const tigerUser = await TigerUser.findById(body.userId)

    const newTigerComment = new TigerComment({
        _id: new mongoose.Types.ObjectId(),
        // TODO:
    })

    const savedTigerPost = await newTigerPost.save()
    tigerUser.tigerPosts = tigerUser.tigerPosts.concat(newTigerPost._id)
    await tigerUser.save()

    response.status(201).json(savedTigerPost)
})

module.exports = tigerCommentsRouter
