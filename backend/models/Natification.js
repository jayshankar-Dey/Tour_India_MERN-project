const mongoose = require('mongoose')

const NatificationSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    admin: {
        type: Boolean,
        default: true
    },
    notic: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })



const Notics = mongoose.model("Notics", NatificationSchema)
module.exports = Notics