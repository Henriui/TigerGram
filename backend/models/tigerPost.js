const mongoose = require('mongoose')


const tigerPostSchema = new mongoose.Schema({
    tigerUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tigerUser',
        required: [true, 'user who posted required']
    },
    image: {
        type: URL,
        required: [true, 'Image of a tiger required']
    },
    tigerComment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tigerComment'
    }]
})

tigerPostSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('tigerPost', tigerPostSchema)