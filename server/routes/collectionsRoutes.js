const express = require('express');
const router = express.Router({mergeParams: true});
const ctrl = require('../controllers/collectionsController');

router
    .route('/')
    .get(ctrl.getCollection)

router
    .route('/:bidId')
    .post(ctrl.addToCollection)

module.exports = router;