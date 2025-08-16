const cron = require('node-cron');
const { handleCompletedBids } = require('../controllers/auctionsController');

const startCollectionUpdater = () => {
    cron.schedule('*/10 * * * * *', async () => {
        await handleCompletedBids();
    })
}

module.exports = {
    startCollectionUpdater
}