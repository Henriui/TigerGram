const tigerPostsRouter = require('express').Router()

const TigerPost = require('../models/tigerPost');
const TigerComment = require('../models/tigerUser');
const TigerUser = require('../models/tigerUser');

// Get all tigerposts

tigerPostsRouter.get('/', async (request, response) => {
    const posts = await TigerPost.find({}).populate('tigerUser', { username: 1 })
    response.json(posts)
    console.log("mitäst teest", posts);
})

// Get tigerPost by :id

// TODO:

// Add new tigerPost

tigerPostsRouter.post('/', async (request, response) => {
    const body = request.body

    // TODO: get user token and decode the token and the get the logged in user

    //const token = getTokenFrom(request)
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!request.token || !decodedToken.id) {
    //   return response.status(401).json({ error: 'token missing or invalid' })
    // }
    // const user = await TigerUser.findById(decodedToken.id)

    const post = new TigerPost({
        tigerUser: body.tigerUser,
        image: body.image,
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

module.exports = tigerPostsRouter
