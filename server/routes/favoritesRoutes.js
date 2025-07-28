const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/favoritesController');

router
    .route('/:bidId')
    .post(ctrl.addToFavorites)
    .delete(ctrl.deleteFavorites)

router
    .route('/')
    .get(ctrl.getFavorites)

module.exports = router;