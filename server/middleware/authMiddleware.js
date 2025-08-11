const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const AppError = require('../utils/AppError');

const authMiddleware = (req,res,next) => {
    const token = req.cookies?.token;
    if (!token) {
        return next(new AppError('missing auth token', 403))
    }

    jwt.verify(token, JWT_SECRET, (err,payload) => {
        if (err) {
            return next(err)
        }
        req.userId = payload.userId;
        next();
    })
}

const optionalAuthMiddleware = (req,res,next) => {
    const token = req.cookies?.token;
    if (!token) {
       return next();
    }
    
    jwt.verify(token, JWT_SECRET, (err,payload) => {
        if (err) {
            next(err)
        }
        req.userId = payload.userId;
        next();
    })
}


module.exports = {
    authMiddleware,
    optionalAuthMiddleware
}