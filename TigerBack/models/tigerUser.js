const mongoose = require('mongoose')
const { Schema } = mongoose;


// User has username, password, avatar, tigerposts and comments.

const tigerUserSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        minLength: 2,
        required: [true, 'Username required']
    },
    passwordHash: {
        type: String,
        required: [true, 'Password required']
    },
    avatar: {
        type: String,
        required: [true, 'Avatar required']
    },
    tigerPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TigerPost'
    }],
    tigerComments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TigerComment'
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