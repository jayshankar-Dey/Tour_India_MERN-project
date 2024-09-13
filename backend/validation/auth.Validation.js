/* eslint-disable no-undef */
const Users = require("../models/UserModel")
const Respons = require("../package/response")
const EmailVarify = require("./EmailValidation")

const registerValidation = async(res, name, email, password, confirmpassword) => {

    if (name && email && password && confirmpassword) {
        const VarifyEmail = await EmailVarify(email)
        if (VarifyEmail) {
            if (password == confirmpassword) {
                const User = await Users.findOne({ email })
                if (User) {
                    Respons(res, 400, false, "User alrady register")
                    return false
                } else {
                    console.log(name, email, password, confirmpassword)
                    return true
                }
            } else {
                Respons(res, 400, false, "password and confirm password not match")
                return false
            }
        } else {
            Respons(res, 400, false, "Please enter valid email")
            throw new Error("Please enter valid email")
        }
    } else {
        Respons(res, 400, false, "Please provide all fields")
        return false
    }

}


module.exports = {
    registerValidation
}