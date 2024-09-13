/* eslint-disable no-undef */
const express = require("express")
const BlogController = require("../controllers/blog.controller");
const isAuth = require("../middlewares/isAuth");
const { uploadVideo } = require('../middlewares/multer');
const Router = express.Router();

Router.post('/addBlog', isAuth, uploadVideo.single("file"), BlogController.addBlog)

Router.get('/getBlog/:id?', BlogController.getBlog)



Router.put('/updateBlog/:id', isAuth, uploadVideo.single("file"), BlogController.UpdateBlog)

Router.delete('/deleteBlog/:id', isAuth, BlogController.deleteBlog)


module.exports = Router