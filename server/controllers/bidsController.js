const {asyncErrorHandler} = require('../middleware/errorMiddleware');
const AppError = require('../utils/AppError');
const {getAllBidsModel,searchBidsModel,getBidByIdModel,postBidModel,deleteBidModel, updateBidModel} = require('../models/bidsModel');
const {deleteFavoritesForBidsModel} = require('../models/favoritesModel');
const {Temporal} = require('@js-temporal/polyfill');

const getBids = asyncErrorHandler(async(req,res) => {
    if (req.query.search) {
        const query = req.query.search;
        const searchBids = await searchBidsModel(query);
        return res.status(200).json(searchBids);
    }
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const bids = await getAllBidsModel(limit);

    return res.status(200).json(bids);

})

const getBidById = asyncErrorHandler(async(req,res)=> {
    const bidId = req.params.bidId;
    const bid = await getBidByIdModel(Number(bidId));
    return res.status(200).json(bid);
})

const postBid = asyncErrorHandler(async(req,res)=> {
    const userId = req.userId;
    const {bidItem,startingBid,startingTime,category,duration, clientTimeZone} = req.body;

    const startingTimeString = `${startingTime.date}T${startingTime.time}:00.000`;
    const startingTimeNY = Temporal.PlainDateTime.from(startingTimeString);
    const startingTimeUTC = startingTimeNY.toZonedDateTime(clientTimeZone).toInstant();

    const bidId = await postBidModel(userId,bidItem,Number(startingBid),startingTimeUTC,category,Number(duration));
    //use the bid id for the client to redirect to the bid that they just posted

    return res.status(201).json({bidId: bidId});
})

const deleteBid = asyncErrorHandler(async(req,res,next)=> {
    const userId = req.userId;
    const bidId = req.params.bidId;

    const deletedFavorites = await deleteFavoritesForBidsModel(Number(bidId));
    const result = await deleteBidModel(Number(bidId),Number(userId));

    if (!result || !deletedFavorites) {
        return next(new AppError('could not delet bid', 400))
    }

    return res.status(200).json({message: 'deleted bid'});
})

const updateBid = asyncErrorHandler(async(req,res,next) => {
    const userId = req.userId;
    const bidId = req.params.bidId;
    const updatedData = req.body;

    const updatedBid = await updateBidModel(Number(bidId), Number(userId), updatedData);

    if (!updatedBid) {
        return next(new AppError('could not update bid', 500))
    }
    
    return res.status(201).json(updatedBid);



})


module.exports = {
    getBids,
    getBidById,
    postBid,
    deleteBid,
    updateBid
}