const mongoose = require('mongoose')

const AboutSchema = new mongoose.Schema({
    name: {
        type: String
    },
    des: [],
    image: {
        url: String,
        public_id: String
    }
}, { timestamps: true })



const Abouts = mongoose.model("Abouts", AboutSchema)
module.exports = Abouts