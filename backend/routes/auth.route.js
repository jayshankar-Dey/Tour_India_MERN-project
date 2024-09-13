/* eslint-disable no-undef */
const express = require("express")
const authController = require("../controllers/auth.controller");
const isAuth = require("../middlewares/isAuth");

const Router = express.Router();

Router.post('/register', authController.Register)
Router.post('/login', authController.login)
Router.post('/google_auth', authController.login_with_google)
    ///add details
Router.post('/Update_User_Details', isAuth, authController.addUserDetails)
Router.get('/getUserdetailes', isAuth, authController.getUserdetailes)
Router.get('/getLikeTour', isAuth, authController.getLikeTure)
module.exports = Router