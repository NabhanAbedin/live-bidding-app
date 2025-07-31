const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router
    .route('/')
    .get(authMiddleware,ctrl.checkLogin);

 router
    .route('/login')
    .post(ctrl.login)

router
    .route('/register')
    .post(ctrl.register);

 router
    .route('/logout')
    .post(ctrl.logOut)


module.exports = router;