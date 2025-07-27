const express = require('express');
const router = express.Router({mergeParams: true});
const ctrl = require('../controllers/bidsController');
const authMiddleware = require('../middleware/authMiddleware');

router
    .route('/')
    .get(ctrl.getBids)
    .post(authMiddleware,ctrl.postBid)
    
router
    .route('/:bidId')
    .get(ctrl.getBidById)
    .delete(authMiddleware,ctrl.deleteBid)
//     .update()

// router
//     .route('/auctions/:bidId')
//     .update()

module.exports = router;
