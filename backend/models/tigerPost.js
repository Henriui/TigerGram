const mongoose = require('mongoose')


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
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('TigerPost', tigerPostSchema)