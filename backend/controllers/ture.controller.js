/* eslint-disable no-undef */
const Respons = require("../package/response")
const getFile = require('../config/getFIle')
const cloudinary = require('cloudinary')
const Tures = require("../models/TureModel")
const TourBooks = require('../models/Ture_Book')
const Razorpay = require('razorpay');
const Users = require("../models/UserModel")
class TureController {
    //add ture
    addTure = async(req, res, next) => {
            try {
                const { name, des, Ticketprice, state } = req.body
                    // const files = req.files
                    // console.log(files)
                if (!name || !des || !Ticketprice || !state) return Respons(res, 400, false, "all filds are required")
                const Ture = new Tures({ name, des, Ticketprice, state })
                    // if (files) {

                //     for (let i = 0; i < files.length; i++) {
                //         let file = getFile(files[i])
                //         const uplode = await cloudinary.v2.uploader.upload((await file).content)
                //         Ture.images.push({
                //             url: uplode.secure_url,
                //             public_id: uplode.public_id
                //         })
                //     }
                // }
                await Ture.save()
                Respons(res, 200, true, "ture add Succesfully", Ture)
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        //get ture
    GetTure = async(req, res, next) => {
            try {
                const { id } = req.params
                const {
                    name,
                    state,
                    des
                } = req.query
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
                if (des) {
                    find.des = { $regex: state, $options: 'i' }
                }
                //const find = id ? { _id: id } : {}
                const ture = await Tures.find(find).limit(8).sort({ comment: -1 }).populate("reviews.user")
                Respons(res, 200, true, "ture gat succesfully", ture)
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        //Update ture
    UpdateTure = async(req, res, next) => {
            try {
                const { id } = req.params
                const { name, Ticketprice, state } = req.body;
                const ture = await Tures.findById(id)
                if (name) ture.name = name;
                // if (des) ture.des = des;
                if (Ticketprice) ture.Ticketprice = Ticketprice;
                if (state) ture.state = state;
                await ture.save()
                Respons(res, 200, true, "ture Update Succesfully", ture)
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        //delete ture
    deleteTure = async(req, res, next) => {
        try {
            const { id } = req.params
            const ture = await Tures.findById(id)
            if (!ture) return Respons(res, 400, false, "please enter valid Id")
            for (let i = 0; i < ture.images.length; i++) {
                await cloudinary.v2.uploader.destroy(ture.images[i].public_id)
            }
            await ture.deleteOne()
            Respons(res, 200, true, "ture delete Succesfully")
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    //add multiple image ture
    add_Multiple_Image_Ture = async(req, res, next) => {
        try {
            const { id } = req.params
            const ture = await Tures.findById(id)
            if (!ture) return Respons(res, 400, false, "please enter valid Id")
            const files = req.files
            for (let i = 0; i < files.length; i++) {
                const file = getFile(files[i])
                const cdb = await cloudinary.v2.uploader.upload((await file).content)
                ture.images.push({
                    public_id: cdb.public_id,
                    url: cdb.secure_url
                })
            }
            await ture.save()
            Respons(res, 200, true, "ture image add Succesfully", ture)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    //add multiple des ture
    add_Multiple_des_Ture = async(req, res, next) => {
        try {
            const { id } = req.params
            const { des } = req.body
            const ture = await Tures.findById(id)
            if (!ture) return Respons(res, 400, false, "please enter valid Id")
            ture.des.push(des)
            await ture.save()
            Respons(res, 200, true, "ture des add Succesfully", ture)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    //delete image  ture
    delete_image_Ture = async(req, res, next) => {
        try {
            const { tureid, imgid } = req.body
            const ture = await Tures.findById(tureid)
            if (!ture) return Respons(res, 400, false, "please enter valid Id")
            let index = 0;
            ture.images.forEach((data, i) => {
                if (data._id.toString() == imgid.toString()) index = i
            })
            await cloudinary.v2.uploader.destroy(ture.images[index].public_id)
            ture.images.pull(imgid)
            await ture.save()
            Respons(res, 200, true, "ture image delete Succesfully", ture)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }



    ///book Ture
    BookTour = async(req, res, next) => {
        try {
            const { totalPayment, users, tourId, image, price, name, date } = req.body
            const rezorpay = new Razorpay({
                key_id: 'rzp_test_Ww0iu7fNG3RgTd',
                key_secret: 'o0yrzL6rnyzFvJIXyhrOE0DB',
            });

            const options = {
                amount: Number(totalPayment * 100),
                currency: "INR"
            };
            const payment = await rezorpay.orders.create(options)

            const order = {
                totalPayment,
                users,
                tourId,
                image,
                price,
                name,
                payment,
                date
            }

            Respons(res, 200, true, " Succesfully", order)

        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    varify_payment_Ture = async(req, res, next) => {
        try {
            const { totalPayment, users, tourId, image, price, name, razorpay_payment_id, razorpay_order_id, razorpay_signature, date } = req.body
            await Tures.findByIdAndUpdate(tourId, { $addToSet: { users: req.user } })
            await TourBooks.create({ totalPayment, users, userId: req.user, tourId, image, price, name, razorpay_payment_id, razorpay_order_id, razorpay_signature, payment: true, date })

            Respons(res, 200, true, "ture des add Succesfully")
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    getBook = async(req, res, next) => {
        try {
            const { id } = req.params
            let ture;
            if (id) {
                ture = await TourBooks.findById(id).populate('userId')
            } else {
                ture = await TourBooks.find({ userId: req.user }).sort({
                    createdAt: -1
                })
            }

            Respons(res, 200, true, "ture get Succesfully", ture)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }


    //cancel Booking
    CancelBooking = async(req, res, next) => {
            try {
                const rezorpay = new Razorpay({
                    key_id: 'rzp_test_Ww0iu7fNG3RgTd',
                    key_secret: 'o0yrzL6rnyzFvJIXyhrOE0DB',
                });
                const { date, id, reson } = req.body

                const Booking = await TourBooks.findById(id)
                if (!Booking) return res.json({ success: false, message: "Booking not found" })
                const refond = await rezorpay.payments.refund(Booking.razorpay_payment_id, {
                    "amount": `${Booking.totalPayment}`,
                    "speed": "normal"
                })
                if (refond) {
                    Booking.cancel = true
                    Booking.Canceldate = date
                    Booking.reson = reson
                    Booking.refoundId = refond.id,
                        Booking.status = refond.status
                }
                await Booking.save()
                    //  console.log(Booking, refon)
                return res.json({
                    success: true,
                    message: "Cancel Succesfully",
                })

            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        ////likeTour


    Like_Tour = async(req, res, next) => {
        try {
            const { id } = req.body

            const tour = await Tures.findByIdAndUpdate(id, {
                $addToSet: { Like: req.user }
            })
            await Users.findByIdAndUpdate(req.user, {
                $addToSet: {
                    Like: id
                }
            })
            return res.json({
                success: true,
                message: "Like Succesfully",
                tour
            })

        } catch (error) {
            next(error)
        }
    }

    ////Unlike Tour

    Unlike_Tour = async(req, res, next) => {
        try {
            const { id } = req.body

            const tour = await Tures.findByIdAndUpdate(id, {
                $pull: { Like: req.user }
            })
            await Users.findByIdAndUpdate(req.user, {
                $pull: {
                    Like: id
                }
            })

            return res.json({
                success: true,
                message: "Unlike Like Succesfully",
                tour
            })

        } catch (error) {
            next(error)
        }
    }

    ///comment

    Comment_tour = async(req, res, next) => {
        try {
            const { id, comment } = req.body

            const data = {
                id,
                comment,
                user: req.user
            }

            const tour = await Tures.findByIdAndUpdate(id, {
                $push: { comment: data }
            })

            return res.json({
                success: true,
                message: "Comment Succesfully",
                tour
            })

        } catch (error) {
            next(error)
        }
    }

    ///rating
    add_Rating = async(req, res, next) => {
        try {
            const { id, rating, tourId } = req.body

            const tour = await Tures.findById(tourId)
            const Book = await TourBooks.findById(id)
            if (!tour.Totalreviews.includes(req.user)) {
                tour.Totalreviews.push(req.user)
            }

            tour.reviews.push({
                rating: rating,
                user: req.user
            })

            tour.rating = tour.reviews.reduce((acc, data) => data.rating + acc, 0) / tour.reviews.length
            Book.rating = Number(rating)

            await Book.save()
            await tour.save()
                // console.log(id, rating, tourId, Book, tour)
            return res.json({
                success: true,
                message: "Rating Succesfully",
                tour
            })

        } catch (error) {
            next(error)
        }
    }


}

module.exports = new TureController()