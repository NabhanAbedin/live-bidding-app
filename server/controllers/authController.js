const {createUser, finduserByName,findUserById } = require('../models/authModel');
const {asyncErrorHandler} = require('../middleware/errorMiddleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = '1h';

const register = asyncErrorHandler(async(req,res,next) => {
    const {username, password} = req.body;
    const hash = await bcrypt.hash(password,SALT_ROUNDS);
    const user = await createUser(username,hash);

    if (!user) {
        return next(new AppError('username exists', 409));
    }

    const token = await jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: JWT_EXPIRY});
    
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60
    })
    return res.status(201).json({id: user.id, username: user.username});
})

const login = asyncErrorHandler(async(req,res,next)=> {
    const {username, password} = req.body;
    const user = await finduserByName(username);
    if (!user) {
        return next(new AppError('incorrect username', 401));
    }

    const validate = await bcrypt.compare(password, user.passwordHash);

    if (!validate) {
        return next(new AppError('incorrect password', 401))
    }

    const token = await jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: JWT_EXPIRY});

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60
    })
    return res.status(201).json({id: user.id, username: user.username});

})

const logOut = asyncErrorHandler(async(req,res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
    })

    return res.status(200).json({message: 'logged out successfully'})
})

module.exports = {
    register,
    login,
    logOut
}