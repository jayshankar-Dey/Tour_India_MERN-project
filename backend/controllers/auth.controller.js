/* eslint-disable no-undef */
const Users = require("../models/UserModel")
const Respons = require("../package/response")
const { registerValidation } = require("../validation/auth.Validation")
const EmailVarify = require("../validation/EmailValidation")


class AuthController {

    ////register Controller
    Register = async(req, res, next) => {
            try {
                const { name, email, password, confirmpassword, admin } = req.body
                const valide = await registerValidation(res, name, email, password, confirmpassword)

                if (valide) {
                    const user = await Users.create({ name, email, password, admin })
                    return Respons(res, 200, true, "register succesfully", user)
                }
            } catch (error) {
                next(error)
            }
        }
        ////login Controller
    login = async(req, res, next) => {
        try {
            const { email, password } = req.body
            if (!email || !password) return Respons(res, 400, false, "please enter all fields")
            const emailValidation = await EmailVarify(email)
            if (emailValidation) {
                const findUser = await Users.findOne({ email })
                if (findUser) {
                    const compaire = await findUser.CompairePassword(password)
                    if (!compaire) return Respons(res, 400, false, "please enter valid email password")
                    const token = await findUser.GenarateToken()
                    const data = {
                        id: findUser._id,
                        token
                    }
                    Respons(res, 200, true, "Login Succesfully", data, )
                } else return Respons(res, 400, false, "Please first register")
            } else { Respons(res, 200, false, "please enter valid email") }

        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    ////login with google Controller
    login_with_google = async(req, res, next) => {
            try {
                const { name, email } = req.body
                if (!email || !name) return Respons(res, 400, false, "please enter all fields")
                const emailValidation = await EmailVarify(email)
                if (emailValidation) {
                    const findUser = await Users.findOne({ email })
                    if (findUser) {
                        const token = await findUser.GenarateToken()
                        Respons(res, 200, true, "Succesfully", token)
                    } else {
                        const user = await Users.create({ name, email })
                        const token = await user.GenarateToken()
                        const data = {
                            id: findUser._id,
                            token
                        }
                        Respons(res, 200, true, "Succesfully", data)
                    }
                } else { Respons(res, 200, false, "please enter valid email") }
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        //////add user details///

    addUserDetails = async(req, res, next) => {
        try {
            const { state, address, pincode, accountno, IFSC, accountholdername, name, email } = req.body
            if (email) {
                const emailValidation = await EmailVarify(email)
                if (!emailValidation) return Respons(res, 400, false, "please enter valide email")
            }
            const user = await Users.findByIdAndUpdate(req.user, { state, address, pincode, accountno, IFSC, accountholdername, name, email })
            Respons(res, 200, true, "add Succesfully", user)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    //////update user details///

    getUserdetailes = async(req, res, next) => {
        try {
            const user = await Users.findById(req.user)
            Respons(res, 200, true, "get Succesfully", user)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    //////get like ture user ///

    getLikeTure = async(req, res, next) => {
        try {
            const user = await Users.findById(req.user).populate("Like")
            Respons(res, 200, true, "get Succesfully", user)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

}
module.exports = new AuthController()