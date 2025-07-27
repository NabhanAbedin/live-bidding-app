const express = require('express');
const router = express.router({mergeParams: true});


router
    .route('/')
    .get()
    .post()
    .delete()
    
router
    .route('/:bidId')
    .get()

router
    .route('/auction/:bidId')
    .update()

module.exports = router;
