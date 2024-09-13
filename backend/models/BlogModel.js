/* eslint-disable no-undef */
const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true
    },
    vedio: {
        url: String,
        public_id: String
    },
    state: {
        type: String,
        required: true
    }
}, { timestamps: true })



const Blogs = mongoose.model("Blogs", BlogSchema)
module.exports = Blogs