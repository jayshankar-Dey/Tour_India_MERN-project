/* eslint-disable no-undef */
const express = require("express")
const AboutController = require("../controllers/about.controller");
const isAuth = require("../middlewares/isAuth");
const { uploadImage } = require('../middlewares/multer');
const Router = express.Router();

Router.post('/addAbout', isAuth, uploadImage.single("file"), AboutController.addAbout)

Router.get('/getAbout/:id?', AboutController.getAbout)

Router.delete('/deleteAbout/:id', isAuth, AboutController.deleteAbout)

Router.put('/update/:id', isAuth, uploadImage.single("file"), AboutController.updateAbout)
module.exports = Router