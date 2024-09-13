/* eslint-disable no-undef */
const Respons = async(res, status, success, message, data) => {
    res.status(status).json({
        success,
        message,
        data
    });
}

module.exports = Respons