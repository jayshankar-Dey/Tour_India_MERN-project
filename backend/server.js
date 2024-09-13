/* eslint-disable no-undef */
const express = require("express")
const { createServer } = require("http")

const { Server } = require("socket.io")
    // eslint-disable-next-line no-unused-vars
const colors = require("colors")
const cors = require("cors")
const morgan = require("morgan")
const cloudinary = require("cloudinary")
const dotenv = require("dotenv")
const connectDB = require("./db")
const authRouter = require("./routes/auth.route")
const Error_Handlor = require("./middlewares/ErrorHandlor")
const tureRouter = require("./routes/ture.route")
const BlogRouter = require("./routes/Blog.route")
const galleryRouter = require("./routes/gallery.route")
const AboutRouter = require("./routes/about.route")
const ContactRouter = require("./routes/contact.route")
const ChatRouter = require("./routes/Chat.route")
dotenv.config()
const app = express()
const server = createServer(app)
    // eslint-disable-next-line no-unused-vars
const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
    ///middleware//////////
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
    ///connect DB
connectDB()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


app.get('/', (req, res) => {
    res.send('wellcome to E-comerce Api')
})

///routes/////////////////
app.use('/api', authRouter)
app.use('/api', tureRouter)
app.use('/api', BlogRouter)
app.use('/api', galleryRouter)
app.use('/api', AboutRouter)
app.use('/api', ContactRouter)
app.use('/api', ChatRouter)


///error handlor meddleware
app.use(Error_Handlor)
    ////socket server///////////////////
io.on('connection', (socket) => {
    console.log('a user connected', socket.id)

    socket.on("UserSendmessage", (message) => {
        console.log(`message from ${socket.id}: ${message}`)
        io.emit("User_message", message)
    })

    socket.on("Admin_send_message", (message) => {
        console.log(`message admin from ${socket.id}: ${message}`)
        io.emit("Admin_message", message)
    })

    //notification
    socket.on("Nitice_admin", (message) => {
        console.log(`notify from ${socket.id}: ${message}`)
        io.emit("Notify_Users", message)
    })

    //chat room
    socket.on("disconnect", () => {
        console.log("a user disconnect")
    })
})


server.listen(process.env.PORT, () => {
    console.log(`server is Starting on port http://localhost:${process.env.PORT}`.bgGreen)
})

module.exports = io