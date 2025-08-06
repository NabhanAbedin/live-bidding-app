const {asyncErrorHandler} = require('../middleware/errorMiddleware');
const AppError = require('../utils/AppError');
const {getCollectionModel, addToCollectionModel, collectionsTotalSpentModel, collectionsCategorizedModel} = require('../models/collectionsModel')

//these will be different because this controller will let you view anybody's collections and not just yours, its like looking at someone's ig posts
const getCollection = asyncErrorHandler( async(req,res,next) => {
    const userId = req.params.userId;
    const collection = await getCollectionModel(Number(userId));
    const totalSpent = await collectionsTotalSpentModel(Number(userId));
    const categorizedSpent = await collectionsCategorizedModel(Number(userId));

    if (collection.length === 0) return next(new AppError('Collection empty', 404));

    return res.status(200).json({collection, totalSpent, categorizedSpent});
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
