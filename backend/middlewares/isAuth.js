const Respons = require("../package/response")
const jwt = require('jsonwebtoken')
const isAuth = async(req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]
        if (!token) return Respons(res, 400, false, "please register first")
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        req.user = id;
        next()
    } catch (error) {
        console.log(error)
        Respons(res, 400, false, "un_AuthorizeUser")
    }
}

module.exports = isAuth