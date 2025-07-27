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
    .patch(authMiddleware,ctrl.updateBid)

// router
//     .route('/auctions/:bidId')
//     .update()
//might get rid of this since socket can talk with prisma directly to update highest bid

module.exports = router;
