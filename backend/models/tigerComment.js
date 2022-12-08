const mongoose = require('mongoose')

const tigerUserSchema = new mongoose.Schema({
    username: {
      type: String,
      minLength: 2,
      required: [true, 'Username required']
  }, 
  avatar: {
    type: URL,
    required: [true, 'Avatar required']
  },
  text: {
    type: String,
    minLength: 1,
    required: [true, 'Comment required']
  }
})

module.exports = mongoose.model('tigerComment', tigerUserSchema)