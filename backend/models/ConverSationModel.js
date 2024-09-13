const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({

    conversations: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chats',
    },
    seen: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })



const Conversations = mongoose.model("Conversations", ConversationSchema)
module.exports = Conversations