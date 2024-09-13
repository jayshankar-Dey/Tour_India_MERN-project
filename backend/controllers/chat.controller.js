///
const Chats = require('../models/ChatModel')
const Conversations = require('../models/ConverSationModel')
const Notice = require('../models/Natification')
class ChatControllor {
    UsersendMessage = async(req, res, next) => {
        try {
            const { tourId, message } = req.body;
            if (!tourId || !message) return res.status(400).json({ success: false, message: 'Both tourId and message are required' });


            const find = await Chats.findOne({ tourId, userId: req.user })
            if (find) {
                if (!find.users.includes(req.user)) {
                    find.users.push(req.user)
                }

                const send = {
                    message,
                    sender: req.user
                }
                find.message.push(send)

                const cnv = await Conversations.findOne({ conversations: find._id })
                cnv.seen = false

                await cnv.save()
                await find.save()
                return res.json({
                    success: true,
                    message: 'Message sent successfully',
                    find,
                    cnv
                });
            } else {
                const send = {
                    message,
                    sender: req.user
                }
                const create = await Chats.create({
                    tourId,
                    users: [req.user],
                    message: [send],
                    userId: req.user
                })
                const cnv = await Conversations.create({ conversations: create._id })
                return res.json({
                    success: true,
                    message: 'Message sent successfully',
                    create,
                    cnv
                });
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }


    ///admin Reply
    AdminReply = async(req, res, next) => {

        try {
            const { tourId, userId, message } = req.body;
            console.log(tourId, userId, message)

            const find = await Chats.findOne({ tourId, userId })

            if (find) {
                if (!find.users.includes(req.user)) {
                    find.users.push(req.user)
                }

                const send = {
                    message,
                    sender: req.user
                }

                find.message.push(send)
                const cnv = await Conversations.findOne({ conversations: find._id })
                cnv.seen = true

                await cnv.save()
                await find.save()
                return res.json({
                    success: true,
                    message: 'Admin message sent successfully',
                    find,
                    cnv
                })
            } else {
                return res.json({
                    success: false,
                    message: 'you cannot send message',
                })
            }



        } catch (error) {
            next(error)
            console.log(error)
        }
    }



    ///get all chats
    GetAll_users_Chats = async(req, res, next) => {
        try {
            const { tourId } = req.params;

            const find = await Chats.findOne({ tourId, userId: req.user }).populate("message.sender").populate("tourId")

            if (find) {
                return res.json({
                    success: true,
                    message: 'All chats',
                    find
                })
            } else {
                return res.json({
                    success: false,
                    message: 'No chat found',
                })
            }



        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    ///get all chat users
    ChatUsers = async(req, res, next) => {
        try {
            let cnv;
            cnv = await Conversations.find({ seen: false }).populate({
                path: 'conversations',
                populate: {
                    path: 'userId'
                }
            }).populate({
                path: 'conversations',
                populate: {
                    path: 'tourId'
                }
            })

            return res.json({
                success: true,
                message: 'chat get all users',
                cnv
            })
        } catch (error) {
            next(error)
            console.log(error)
        }
    }



    ///notifications
    Notifications = async(req, res, next) => {
            try {
                const { notic, userId, admin } = req.body
                const Notic = await Notice.create({
                    notic,
                    userId,
                    admin
                })
                return res.json({
                    success: true,
                    message: 'Notification send',
                    Notic
                })
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        ///seen
    Seen_Notifications = async(req, res, next) => {
        try {
            const Notic = await Notice.updateMany({ userId: req.user }, {
                $set: {
                    seen: true
                }
            })
            return res.json({
                success: true,
                message: 'Notification send',
                Notic
            })
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    ///get notifications
    Get_Notifications = async(req, res, next) => {
        try {
            const Notic = await Notice.find({
                userId: req.user
            }).populate("userId").sort({ createdAt: -1 })
            const total = await Notice.find({
                userId: req.user,
                seen: false
            })
            return res.json({
                success: true,
                message: 'Notification get',
                Notic,
                total: total.length
            })
        } catch (error) {
            next(error)
            console.log(error)
        }
    }




    /////




}

module.exports = new ChatControllor()