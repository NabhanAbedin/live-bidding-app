const {asyncErrorHandler} = require('../middleware/errorMiddleware');
const AppError = require('../utils/AppError');
const {getAllBidsModel,searchBidsModel,getBidByIdModel,postBidModel,deleteBidModel, updateBidModel} = require('../models/bidsModel');
const {deleteFavoritesForBidsModel, checkFavoriteByBidModel} = require('../models/favoritesModel');
const {Temporal} = require('@js-temporal/polyfill');
const { favorites } = require('../db');

const getBids = asyncErrorHandler(async(req,res,next) => {
    if (req.query.search) {
        const query = req.query.search;
        const searchBids = await searchBidsModel(query);
        if (searchBids.length  === 0) return next(new AppError(`No bids found with ${query}`, 404));
        return res.status(200).json(searchBids);
    }
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const bids = await getAllBidsModel(limit);

    return res.status(200).json(bids);

})

const getBidById = asyncErrorHandler(async(req,res)=> {
    const bidId = req.params.bidId;
    const bid = await getBidByIdModel(Number(bidId));
    let favorited = false;
    
    if (req.userId) {
        favorited  = await checkFavoriteByBidModel(Number(bidId),Number(req.userId));
    }

    return res.status(200).json({bid,favorited});
})

const postBid = asyncErrorHandler(async(req,res)=> {
    const userId = req.userId;
    const {bidItem,startingBid,startingDate, startingTime,category,duration, clientTimeZone} = req.body;

    const startingTimeString = `${startingDate}T${startingTime}:00.000`;

    const startingTimeNY = Temporal.PlainDateTime.from(startingTimeString);
    const endTimeNY = startingTimeNY.add({minutes: duration});

    const startingTimeUTC = startingTimeNY.toZonedDateTime(clientTimeZone).toInstant();
    const endTimeUTC = endTimeNY.toZonedDateTime(clientTimeZone).toInstant();

    const bidId = await postBidModel(userId,bidItem,Number(startingBid),startingTimeUTC, endTimeUTC,category,Number(duration));
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
    const data = req.body;

    const updatedData = Object.entries(data).reduce((acc, [key, val]) => {
        if (key === 'startingBid' || key === 'bid_duration') {
          const n = Number(val);
            acc[key] = n;
        } else {
          acc[key] = val;
        }
        return acc;
      }, {});

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