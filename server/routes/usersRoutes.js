const express = require('express');
const router = express.router();
const collectionsRoutes = require('./collectionsRoutes');
const bidsRoutes = require('./bidsRoutes');
const authMiddleware = require('../middleware/authMiddleware');

router.use('/:userId/collections', authMiddleware, collectionsRoutes );
router.use('/:userId/bids', authMiddleware, bidsRoutes );


router
    .route('/financials')
    .update()
    .get()

module.exports = router;