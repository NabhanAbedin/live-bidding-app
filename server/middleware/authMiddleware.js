const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const AppError = require('../utils/AppError');

module.exports = (req,res,next) => {
    const token = req.cookies?.token;
    if (!token) {
        return next(new AppError('missing auth token', 403))
    }

    jwt.verify(token, JWT_SECRET, (err,payload) => {
        if (err) {
            next(err)
        }
        req.userId = payload.userId;
        next();
    })
}