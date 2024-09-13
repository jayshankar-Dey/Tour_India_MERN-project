/* eslint-disable no-undef */
const Respons = require("../package/response")
const getFile = require('../config/getFIle')
const cloudinary = require('cloudinary')
const Abouts = require("../models/AboutModel")
class AboutController {
    //add About
    addAbout = async(req, res, next) => {
            try {
                const { name, des } = req.body
                if (!des && !name && !req.file) return Respons(res, 400, false, "please provide all fields")
                const file = getFile(req.file)
                const cdb = await cloudinary.v2.uploader.upload((await file).content)
                const image = {
                    url: cdb.secure_url,
                    public_id: cdb.public_id
                }
                const About = await Abouts.create({
                    des,
                    name,
                    image
                })
                Respons(res, 200, true, "About add Succesfully", About)
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        //get galery
    getAbout = async(req, res, next) => {
            try {
                let galery;
                const { id } = req.params
                if (id) {
                    galery = await Abouts.findById(id)
                } else {
                    galery = await Abouts.find({})
                }
                Respons(res, 200, true, " About get Succesfully", galery)
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        //delete galery
    deleteAbout = async(req, res, next) => {
        try {
            const { id } = req.params
            const About = await Abouts.findById(id)
            await cloudinary.v2.uploader.destroy(About.image.public_id)
            await About.deleteOne()
            Respons(res, 200, true, "About delete Succesfully")
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    //update galery
    updateAbout = async(req, res, next) => {
        try {
            const { id } = req.params
            const { name, des } = req.body
            const About = await Abouts.findById(id)
            if (name) About.name = name;
            if (req.file) {
                const file = getFile(req.file)
                await cloudinary.v2.uploader.destroy(About.image.public_id)
                const cdb = await cloudinary.v2.uploader.upload((await file).content)
                About.image = {
                    public_id: cdb.public_id,
                    url: cdb.secure_url
                }
            }
            if (des) About.des.push(des);
            await About.save()
            Respons(res, 200, true, "Update Succesfully", About)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

}

module.exports = new AboutController()