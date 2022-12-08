const mongoose = require('mongoose')

const url = process.env.DATABASE_URL
mongoose.connect(url)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const tigerPostSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 2,
    required: [true, 'User name required'],
  }
})

module.exports = mongoose.model('tigerPersons', tigerPostSchema)