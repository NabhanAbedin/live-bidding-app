const {asyncErrorHandler} = require('../middleware/errorMiddleware');
const AppError = require('../utils/AppError');
const {updateCurrency, getCurrency, recentTransactions} = require('../models/usersModel');

const updateFinancials = asyncErrorHandler(async(req,res,next)=> {
    const currency = req.body.currency;
    const userId = req.userId;

    const currentCurrency = await getCurrency(Number(userId));
    
    if (currentCurrency + Number(currency) < 0) {
        return next(new AppError('Insufficient funds', 400));
    }

    const updatedCurrency = await updateCurrency(Number(currency), Number(userId));

    if (!updatedCurrency) {
        return next(new AppError('could not update currency amount', 500))
    }

    return res.status(200).json({message: 'updated currency amount'})
})

const getFinancials = asyncErrorHandler(async (req,res,next) => {
    const userId = req.userId;
    const currentCurrency = await getCurrency(Number(userId));
    const transactions = await recentTransactions(Number(userId));

    if (!transactions) {
        return next(new AppError('User has not bought any bids', 404));
    }

    return res.status(200).json({currentCurrency,transactions});

})

module.exports = {
    updateFinancials,
    getFinancials
}

