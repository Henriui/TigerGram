const mongoose = require('mongoose')


const tigerPostSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 2,
    required: [true, 'Username required']
  },
  avatar: {
    type: URL,
    required: [true, 'Avatar required']
  },
  image: {
    type: URL,
    required: [true, 'Image of a tiger required']
  },
  tigerComment: {
    type: Array,
  }
})

module.exports = mongoose.model('tigerPersons', tigerPostSchema)