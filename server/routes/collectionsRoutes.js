const express = require('express');
const router = express.Router({mergeParams: true});
const authMiddleware = require('../middleware/authMiddleware');

router
    .route('/')
    .get()

router
    .route('/:bidId')
    .post()
    .delete()

module.exports = router;