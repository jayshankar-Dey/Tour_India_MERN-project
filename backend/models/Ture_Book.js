/* eslint-disable no-undef */
const mongoose = require('mongoose')

const Book_Model = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
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
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    totalPayment: {
        type: Number,
        required: true
    },
    users: [],
    payment: {
        type: Boolean,
        default: false
    },
    cancel: {
        type: Boolean,
        default: false
    },
    reson: {
        type: String
    },
    date: {
        type: String
    },
    Canceldate: {
        type: String
    },
    refoundId: {
        type: String
    },
    status: {
        type: String
    }

}, {
    timestamps: true,
    strict: false
})



const TourBooks = mongoose.model("TourBooks", Book_Model)
module.exports = TourBooks