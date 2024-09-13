/* eslint-disable no-undef */
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    state: {
        type: String
    },
    address: {
        type: String
    },
    pincode: {
        type: String
    },
    accountno: {
        type: String
    },
    IFSC: {
        type: String
    },
    accountholdername: {
        type: String
    },
    Like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tures'
    }],
}, { timestamps: true })

UserSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) next()
    user.password = await bcrypt.hash(user.password, 10)
})

UserSchema.methods.CompairePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.GenarateToken = async function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET)
}

const Users = mongoose.model("Users", UserSchema)
module.exports = Users