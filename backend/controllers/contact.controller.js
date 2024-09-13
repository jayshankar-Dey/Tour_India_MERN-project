/* eslint-disable no-undef */
const Contacts = require("../models/ContactModel")
const Respons = require("../package/response")
    //const { registerValidation } = require("../validation/auth.Validation")
const EmailVarify = require("../validation/EmailValidation")


class ContactController {

    ////Contact Controller
    addContact = async(req, res, next) => {
        try {
            const { name, email, phone, subject, message } = req.body
            if (!name && !email && !phone && !subject && !message) return Respons(res, 400, false, "please enter all fields")
            const valide = await EmailVarify(email)
            if (!valide) return Respons(res, 400, false, "please enter valide email")

            const contact = await Contacts.create({ name, email, phone, subject, message })
            return Respons(res, 200, true, "Contact succesfully", contact)

        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    ////get Contact Controller
    getContact = async(req, res, next) => {
        try {

            const contact = await Contacts.find({})
            return Respons(res, 200, true, "get succesfully", contact)

        } catch (error) {
            next(error)
            console.log(error)
        }
    }



}
module.exports = new ContactController()