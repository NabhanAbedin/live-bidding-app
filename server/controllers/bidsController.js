const {asyncErrorHandler} = require('../middleware/errorMiddleware');
const AppError = require('../utils/AppError');
const {getAllBidsModel,searchBidsModel,getBidByIdModel,postBidModel,deleteBidModel, updateBidModel} = require('../models/bidsModel');

const getBids = asyncErrorHandler(async(req,res) => {
    if (req.query) {
        query = req.query.search;
        const searchBids = await searchBidsModel(query);
        return res.status(200).json(searchBids);
    }

    const bids = await getAllBidsModel();

    return res.status(200).json(bids);

})

const getBidById = asyncErrorHandler(async(req,res)=> {
    const bidId = req.params.bidId;
    const bid = await getBidByIdModel(Number(bidId));
    return res.status(200).json(bid);
})

const postBid = asyncErrorHandler(async(req,res)=> {
    const userId = req.userId;
    const {bidItem,startingBid,category,duration} = req.body;

    const bidId = await postBidModel(userId,bidItem,Number(startingBid),category,Number(duration));
    //use the bid id for the client to redirect to the bid that they just posted

    return res.status(201).json({bidId: bidId});
})

const deleteBid = asyncErrorHandler(async(req,res,next)=> {
    const userId = req.userId;
    const bidId = req.params.bidId;

    const result = await deleteBidModel(Number(bidId),Number(userId));

    if (!result) {
        return next(new AppError('could not delet bid', 400))
    }

    return res.status(200).json({message: 'deleted bid'});
})

const updateBid = asyncErrorHandler(async(req,res,next) => {
    const userId = req.userId;
    const bidId = req.params.bidId;
    const updatedData = req.body;
    console.log(updatedData);

    const allowedChange = ['bidItem','highestBid', 'category', 'bid_duration', 'title', 'description'];

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