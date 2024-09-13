/* eslint-disable no-undef */
const express = require("express")
const ContactController = require("../controllers/contact.controller");
const isAuth = require("../middlewares/isAuth");
//const { uploadImage } = require('../middlewares/multer');
const Router = express.Router();

Router.post('/addContact', isAuth, ContactController.addContact)
Router.get('/getContact', isAuth, ContactController.getContact)

module.exports = Router