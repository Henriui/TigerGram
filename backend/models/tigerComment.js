const mongoose = require('mongoose')
const { Schema } = mongoose;

// TigerComment is made of id, tigerpost it's in, tigerUser who posted it, text comment

const tigerCommentSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    tigerpost_id: {
        type: Schema.Types.ObjectId,
        ref: "TigerPost"
    },
    tigerUser_id: {
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