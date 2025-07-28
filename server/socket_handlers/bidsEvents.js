const {asyncErrorHandler} = require('../middleware/errorMiddleware');
const placeBid = require('../services/bidsService');

module.exports = (io,socket) => {
    socket.on('placeBid', async ({bidId, amount}) => {
        try {
            const updatedBid = await placeBid(Number(bidId), Number(amount), socket.userId);

            if (!success) {
                return socket.emit('bidError', {
                    bidId,
                    message: 'Your bid is lower than the current amount'
                })
            }

            io.to(`bidRoom:${bidId}`).emit('bidUpdated', updatedBid);
        } catch (err) {
            console.log(err);
            socket.emit('bidError', {
                bidId,
                message: 'Something went wrong please try again'
            })
        }
    })
}