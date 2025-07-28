const express = require('express');
const router = express.Router();
//const collectionsRoutes = require('./collectionsRoutes');
const bidsRoutes = require('./bidsRoutes');
const favoritesRoutes = require('./favoritesRoutes');
const authMiddleware = require('../middleware/authMiddleware');
const ctrl = require('../controllers/usersController');


//router.use('/:userId/collections', authMiddleware, collectionsRoutes );
router.use('/:userId/bids', authMiddleware, bidsRoutes );
router.use('/favorites', authMiddleware, favoritesRoutes)


router
    .route('/financials')
    .patch(authMiddleware,ctrl.updateFinancials)

module.exports = router;