const {asyncErrorHandler} = require('../middleware/errorMiddleware');
const AppError = require('../utils/AppError');
const {getChatsModel} = require('../models/chatsModel');

const getChats = asyncErrorHandler(async(req,res,next) => {
    const bidId = req.params.bidId;

    const bidChats = await getChatsModel(Number(bidId));

    if (!bidChats) {
        return next(new AppError('Could  not retrieve chats', 500))
    }

    return res.status(200).json(bidChats);
})

module.exports = {
    getChats
}