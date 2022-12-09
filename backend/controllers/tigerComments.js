const tigerCommentsRouter = require('express').Router()

const TigerPost = require('../models/tigerPost');
const TigerComment = require('../models/tigerComment');
const TigerUser = require('../models/tigerUser');

// Get all tigercomments

tigerCommentsRouter.get('/', async (request, response) => {
    const tigerComments = await TigerComment
    .find({})
    .populate('tigerUser', { username: 1 })
    // .populate('tigerpost_id', { id: 1 })
    response.json(tigerComments)
})
// Add new tigerComment

tigerCommentsRouter.post('/', async (request, response) => {
    const body = request.body
    
        // TODO: get user token and decode the token and the get the logged in user
    
        //const token = getTokenFrom(request)
        // const decodedToken = jwt.verify(request.token, process.env.SECRET)
        // if (!request.token || !decodedToken.id) {
        //   return response.status(401).json({ error: 'token missing or invalid' })
        // }
        // const user = await TigerUser.findById(decodedToken.id)

    const newTigerComment = new TigerComment({
        tigerUser: body.tigerUser,
        _id: new mongoose.Types.ObjectId(),
        text: request.body.text
    })

    const savedTigerComment = await newTigerComment.save()
    tigerPost = tigerPosts.tigerComments.concat(newTigerComment._id)
    await tigerPosts.save()

    response.status(201).json(savedTigerComment)
})

module.exports = tigerCommentsRouter
