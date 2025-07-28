const {asyncErrorHandler} = require('../middleware/errorMiddleware');
const AppError = require('../utils/AppError');
const {getFavoritesModel, addToFavoritesModel, deleteFavoritesModel } = require('../models/favoritesModel');


const getFavorites = asyncErrorHandler(async(req,res)=> {
    const userId = req.userId;
    
    const favoriteBids = await getFavoritesModel(Number(userId));

    return res.status(200).json(favoriteBids);

})

const addToFavorites = asyncErrorHandler(async(req,res,next)=> {
    const userId = req.userId;
    const bidId = req.params.bidId;

    const result = await addToFavoritesModel(Number(bidId), Number(userId));

    if (!result) {
        return next(new AppError('could not add to favorites', 500));
    }

    return res.status(201).json({message: 'added to favorites'});
})

const deleteFavorites = asyncErrorHandler(async(req,res,next)=> {
    const userId = req.userId;
    const bidId = req.params.bidId;

    const result = await deleteFavoritesModel(Number(bidId), Number(userId));

    if (!result) {
        return next(new AppError('could not delete from favorites', 500));
    }

    return res.status(201).json({message: 'removed from favorites'});
})


module.exports = {
    getFavorites,
    addToFavorites,
    deleteFavorites
}
