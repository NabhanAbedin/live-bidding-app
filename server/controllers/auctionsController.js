const { processCompletedBids } = require('../models/auctionsModel');
const AppError = require('../utils/AppError');

const handleCompletedBids = async () => {
    try {
        await processCompletedBids();
    } catch (err) {
        new AppError(err, 500)
    }
}

module.exports = {
    handleCompletedBids
}