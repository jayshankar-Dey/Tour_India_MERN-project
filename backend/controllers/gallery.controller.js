/* eslint-disable no-undef */
const Respons = require("../package/response")
const getFile = require('../config/getFIle')
const cloudinary = require('cloudinary')
const Galerys = require("../models/galeryModel")
class GalleryController {
    //add galery
    addGallery = async(req, res, next) => {
            try {
                const { state } = req.body
                if (!state && !req.file) return Respons(res, 400, false, "please provide all fields")
                const file = getFile(req.file)
                const cdb = await cloudinary.v2.uploader.upload((await file).content)
                const image = {
                    url: cdb.secure_url,
                    public_id: cdb.public_id
                }
                const galery = await Galerys.create({
                    state,
                    image
                })
                Respons(res, 200, true, "add Succesfully", galery)
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        //get galery
    getGallery = async(req, res, next) => {
            try {
                const { id } = req.params
                const { state } = req.query
                const find = {}
                if (id) {
                    find._id = id
                }
                if (state) {
                    find.state = { $regex: state, $options: 'i' }
                }
                const galery = await Galerys.find(find)
                Respons(res, 200, true, "get Succesfully", galery)
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        //delete galery
    deleteGallery = async(req, res, next) => {
        try {
            const { id } = req.params
            const galery = await Galerys.findById(id)
            await cloudinary.v2.uploader.destroy(galery.image.public_id)
            await galery.deleteOne()
            Respons(res, 200, true, "delete Succesfully")
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    //update galery
    updateGallery = async(req, res, next) => {
        try {
            const { id } = req.params
            const { state } = req.body
            const galery = await Galerys.findById(id)
            if (state) galery.state = state;
            if (req.file) {
                const file = getFile(req.file)
                await cloudinary.v2.uploader.destroy(galery.image.public_id)
                const cdb = await cloudinary.v2.uploader.upload((await file).content)
                galery.image = {
                    public_id: cdb.public_id,
                    url: cdb.secure_url
                }
            }
            await galery.save()
            Respons(res, 200, true, "delete Succesfully", galery)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

}

module.exports = new GalleryController()