const {asyncErrorHandler} = require('../middleware/errorMiddleware');
const AppError = require('../utils/AppError');
const {getCollectionModel, addToCollectionModel} = require('../models/collectionsModel')

//these will be different because this controller will let you view anybody's collections and not just yours, its like looking at someone's ig posts
const getCollection = asyncErrorHandler( async(req,res) => {
    const userId = req.params.userId;
    const collection = await getCollectionModel(Number(userId));

    return res.status(200).json(collection);
})

const addToCollection = asyncErrorHandler(async(req,res) => {
    const userId = req.params.userId;
    const bidId = req.params.bidId;

    const result = await addToCollectionModel(Number(bidId),Number(userId));

    if (!result) {
        return next(new AppError('could not add to collection', 400))
    }

    return res.status(201).json({message: 'added to collection'})
})


module.exports = {
    getCollection,
    addToCollection
}
