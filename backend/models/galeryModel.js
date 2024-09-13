const mongoose = require('mongoose')

const GalerySchema = new mongoose.Schema({
    image: {
        url: String,
        public_id: String
    },
    state: {
        type: String,
        required: true
    }
}, { timestamps: true })



const Galerys = mongoose.model("Galerys", GalerySchema)
module.exports = Galerys