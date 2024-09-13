const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tures',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }],
    message: [{
        message: {
            type: String
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        }
    }],

}, { timestamps: true })



const Chats = mongoose.model("Chats", ChatSchema)
module.exports = Chats