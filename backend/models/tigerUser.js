const mongoose = require('mongoose')


const tigerPostSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 2,
        required: [true, 'Username required']
    },
    passwordHash: String,
    avatar: {
        type: URL,
        required: [true, 'Avatar required']
    },
    image: {
        type: URL,
        required: [true, 'Image of a tiger required']
    },
    tigerPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tigerPosts'
    }]
})

tigerPostSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })
module.exports = mongoose.model('tigerPersons', tigerPostSchema)