const express = require('express');
const router = express.router({mergeParams: true});

router
    .route('/')
    .post()
    .get()

module.exports = router;