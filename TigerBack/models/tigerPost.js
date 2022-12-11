const mongoose = require('mongoose')
const { Schema } = mongoose;

// Post is made of id, user, image, date and comments.

const tigerPostSchema = new mongoose.Schema({
    tigerUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TigerUser',
        required: [true, 'user who posted required']
    },
    tigerAvatar: {
        type: String,
        ref: 'TigerAvatar',
        required: [true, 'user avatar required']
    },
    image: {
        type: String,
        required: [true, 'Image of a tiger required']
    },
    text: {
        type: String,
        ref: 'text',
        required: [true, 'post text is required']
    },
    date: Date,
    tigerComment: [{
        username: {
            type: String,
        },
        avatar: {
            type: String,
        },
        text: {
            type: String,
        },
      
    }]
})

tigerPostSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const TigerPost = mongoose.model('TigerPost', tigerPostSchema)
module.exports = TigerPost