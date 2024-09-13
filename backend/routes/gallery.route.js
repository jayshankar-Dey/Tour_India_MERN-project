/* eslint-disable no-undef */
const express = require("express")
const GalleryController = require("../controllers/gallery.controller");
const isAuth = require("../middlewares/isAuth");
const { uploadImage } = require('../middlewares/multer');
const Router = express.Router();

Router.route('/galeryImage/:id?').post(isAuth, uploadImage.single("file"), GalleryController.addGallery).get(isAuth, GalleryController.getGallery).delete(isAuth, GalleryController.deleteGallery).put(isAuth, uploadImage.single("file"), GalleryController.updateGallery)
module.exports = Router