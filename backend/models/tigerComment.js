const mongoose = require('mongoose')

const tigerCommentSchema = new mongoose.Schema({
    tigerUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TigerUser'
    },
    text: {
        type: String,
        minLength: 1,
        required: [true, 'Comment required']
    }
})
const TigerComment = mongoose.model('TigerComment', tigerCommentSchema)
module.exports = TigerComment