/* eslint-disable no-undef */
const mongoose = require('mongoose')

const TureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    des: [],
    images: [{
        url: String,
        public_id: String
    }],
    Ticketprice: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 1
    },
    reviews: [{
        rating: {
            type: Number,
            required: true,
            default: 1
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    }],
    Totalreviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    Like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    comment: [],
}, { timestamps: true })



const Tures = mongoose.model("Tures", TureSchema)
module.exports = Tures