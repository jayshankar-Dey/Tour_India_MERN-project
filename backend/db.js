/* eslint-disable no-undef */
const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(process.env.DB).then(() => {
            console.log('Connection Succesfully'.bgWhite.black)
        })
        .catch((err) => {
            console.log(`errer in connection ${err}`)
        })
}

module.exports = connectDB