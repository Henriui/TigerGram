const tigerPostsRouter = require('express').Router()
const TigerPost = require('../models/tigerPost');
const jwt = require('jsonwebtoken')

// Get all tigerposts
tigerPostsRouter.get('/', async (request, response) => {
    const posts = await TigerPost.find({}).populate('tigerUser', { username: 1, avatar: 1 })
    response.json(posts)
})

// Get tigerPost by :id
tigerPostsRouter.get('/:id', async (request, response) => {
    const id = (request.params.id);
    const post = await TigerPost.findById(id);
    response.json(post);
})

// Add new tigerPost
tigerPostsRouter.post('/', async (request, response) => {
    const body = request.body
    // TODO: get user token and decode the token and the get the logged in user

    // const token = getTokenFrom(request)
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!request.token || !decodedToken.id) {
    //   return response.status(401).json({ error: 'token missing or invalid' })
    // }
    // const user = await TigerUser.findById(decodedToken.id)
    const post = new TigerPost({
        tigerUser: body.tigerUser,
        image: body.image,
        text: body.text,
        date: new Date()
    })
    const savedPost = await post.save()
    // user.post = user.post.concat(savedPost.id)
    // await user.save()
    response.status(201).json(savedPost)

})

// Delete tigerpost by :id
tigerPostsRouter.delete('/:id', async (request, response) => {
    await TigerPost.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

// Edit tigerPost ()

// TODO:
tigerPostsRouter.put('/:id', async (request, response) => {
    const body = request.body
    
    const { tigerUser, tigerComment } = request.body
    
    const blog = await TigerPost.findByIdAndUpdate(request.params.id, { tigerUser, tigerComment }, { new: body.tigerComment })
    if (blog)
        response.json(blog)
    else
        response.status(404).end()
})

module.exports = tigerPostsRouter
