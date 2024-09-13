const Error_Handlor = async(req, res, next) => {

    const message = error.message || "something waight wrong "
    const status = error.status || 400
    res.status(status).json({
        success: false,
        message
    });
}

module.exports = Error_Handlor