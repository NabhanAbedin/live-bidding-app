module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })
}

module.exports = (func) => {
    return (req,res,next) => {
        func(req,res,next).catch(err => next(err));
    }
}