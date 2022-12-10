const mongoose = require('mongoose')
const { Schema } = mongoose;

// Post is made of id, user, image, date and comments.

const tigerPostSchema = new mongoose.Schema({
    tigerUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TigerUser',
        required: [true, 'user who posted required']
    },
    image: {
        type: String,
        required: [true, 'Image of a tiger required']
    },
    date: Date,
    tigerComment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TigerComment'
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