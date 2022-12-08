const mongoose = require('mongoose')


const tigerUserSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 2,
        required: [true, 'Username required']
    },
    passwordHash: String,
    avatar: {
        type: String,
        required: [true, 'Avatar required']
    },
    tigerPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tigerPosts'
    }]
})

tigerUserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})
const TigerUser = mongoose.model('TigerUser', tigerUserSchema)
module.exports = TigerUser