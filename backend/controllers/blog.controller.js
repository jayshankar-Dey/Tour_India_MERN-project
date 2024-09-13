/* eslint-disable no-undef */
const Respons = require("../package/response")
const getFile = require('../config/getFIle')
const cloudinary = require('cloudinary')
const Blogs = require("../models/BlogModel")
class BlogController {
    //add Blog
    addBlog = async(req, res, next) => {
            try {
                const { name, des, state } = req.body
                if (!name && !des && !state) return Respons(res, 400, false, "Please provide all fields")

                const blog = await Blogs.create({ name, des, state })
                Respons(res, 200, true, "blog add Succesfully", blog)

            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        //get Blog
    getBlog = async(req, res, next) => {
        try {
            const { id } = req.params
            const { name, state } = req.query
                //console.log(name, state)
            const find = {}
            if (id) {
                find._id = id
            }
            if (name) {
                find.name = { $regex: name, $options: 'i' }
            }
            if (state) {
                find.state = { $regex: state, $options: 'i' }
            }
            const blog = await Blogs.find(find)
            Respons(res, 200, true, "get Succesfully", blog)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    // if (req.file.size < 30000000) {
    //     const file = getFile(req.file)
    //     const cdb = await cloudinary.v2.uploader.upload((await file).content, {
    //         resource_type: "video",
    //         eager_async: true,
    //         eager_notification_url: "https://mysite.example.com/notify_endpoint"
    //     })
    //     const vedio = {
    //         url: cdb.secure_url,
    //         public_id: cdb.public_id
    //     }
    //     const blog = await Blogs.create({ name, des, state })
    //     Respons(res, 200, true, "blog add Succesfully", blog)
    // } else return Respons(res, 400, false, "vedio size maximum 30mb")

    //Update blog
    UpdateBlog = async(req, res, next) => {
            try {
                const { id } = req.params
                const { name, state, des } = req.body
                console.log(name, state, des)
                const blog = await Blogs.findById(id)
                if (name) blog.name = name;
                if (state) blog.state = state;
                if (des) blog.des = des;
                // console.log(req.file)
                if (req.file) {
                    console.log(req.file)

                    const file = getFile(req.file)
                    if (blog.vedio.public_id) {
                        await cloudinary.v2.uploader.destroy(blog.vedio.public_id, {
                            resource_type: "video",
                            eager_async: true
                        })
                    }

                    const cdb = await cloudinary.v2.uploader.upload((await file).content, {
                        resource_type: "video",
                        eager_async: true,
                        eager_notification_url: "https://mysite.example.com/notify_endpoint"
                    })
                    blog.vedio = {
                        url: cdb.secure_url,
                        public_id: cdb.public_id

                    }
                }
                await blog.save()
                Respons(res, 200, true, "Update Succesfully", blog)
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        //delete ture
    deleteBlog = async(req, res, next) => {
        try {
            const { id } = req.params
            const blog = await Blogs.findById(id)
            if (blog.vedio.public_id) {
                await cloudinary.v2.uploader.destroy(blog.vedio.public_id, {
                    resource_type: "video",
                    eager_async: true
                })
            }
            await blog.deleteOne()
            Respons(res, 200, true, "delete Succesfully")
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

}

module.exports = new BlogController()