const express = require('express');
const router = express.router();

router
    .route('/:bidId')
    .post()
    .delete()

router
    .route('/')
    .get()

module.exports = router;