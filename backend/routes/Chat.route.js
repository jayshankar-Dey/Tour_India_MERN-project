/* eslint-disable no-undef */
const express = require("express")
const ChatController = require("../controllers/chat.controller");
const isAuth = require("../middlewares/isAuth");

const Router = express.Router();

Router.post('/user_send/message', isAuth, ChatController.UsersendMessage)
Router.post('/admin_send/message', isAuth, ChatController.AdminReply)

Router.get('/get_user/message/:tourId', isAuth, ChatController.GetAll_users_Chats)

Router.get('/Chat_users', ChatController.ChatUsers)

//notifications
Router.post('/Notice', isAuth, ChatController.Notifications)
Router.get('/Notice', isAuth, ChatController.Get_Notifications)
Router.put('/Notice', isAuth, ChatController.Seen_Notifications)
module.exports = Router