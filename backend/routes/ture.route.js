/* eslint-disable no-undef */
const express = require("express")
const TureController = require("../controllers/ture.controller");
const isAuth = require("../middlewares/isAuth");
const { uploadImage } = require('../middlewares/multer');

const Router = express.Router();

Router.route('/Ture/:id?').post(isAuth, uploadImage.array("file"), TureController.addTure).get(TureController.GetTure).delete(isAuth, TureController.deleteTure)


Router.post('/add/multipleImage/:id', isAuth, uploadImage.array("file"), TureController.add_Multiple_Image_Ture)

Router.post('/update/:id', isAuth, TureController.UpdateTure)

Router.post('/add/multiple/des/:id', isAuth, uploadImage.array("file"), TureController.add_Multiple_des_Ture)


Router.post('/delete/image', isAuth, TureController.delete_image_Ture)


//book route
Router.post('/order', isAuth, TureController.BookTour)
Router.post('/varify/payment', isAuth, TureController.varify_payment_Ture)
Router.get('/getBook/:id?', isAuth, TureController.getBook)
Router.post('/cancel/booking', isAuth, TureController.CancelBooking)


////like unlike and comment route
Router.post('/Like', isAuth, TureController.Like_Tour)
Router.post('/Unlike', isAuth, TureController.Unlike_Tour)

Router.post('/comment', isAuth, TureController.Comment_tour)


Router.put('/rating/tour', isAuth, TureController.add_Rating)


module.exports = Router