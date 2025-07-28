const express = require('express');
const router = express.Router({mergeParams: true});
const ctrl = require('../controllers/bidsController');
const authMiddleware = require('../middleware/authMiddleware');
const chatsRoutes = require('../routes/chatsRoutes');

//all these api routes are for altering/creating bids and NOT during when the live bidding is happening and on completion

router.use('/:bidId/chats', authMiddleware, chatsRoutes);

router
    .route('/')
    .get(ctrl.getBids)
    .post(authMiddleware,ctrl.postBid)
    
router
    .route('/:bidId')
    .get(ctrl.getBidById)
    .delete(authMiddleware,ctrl.deleteBid)
    .patch(authMiddleware,ctrl.updateBid)


module.exports = router;
