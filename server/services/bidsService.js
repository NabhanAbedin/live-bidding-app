const prisma = require('../db');

const placeBid = async (bidId, amount, userId) => {
    const result = await prisma.bids.updateMany({
        where: {
          id: bidId,
          OR: [
            { highestBid: null, startingBid: { lt: amount } },
            { highestBid: { lt: amount } }
          ]
        },
        data: { highestBid: amount, winnerId: userId }
      });
    
    if (result.count === 0) return false;
    return await prisma.bids.findUnique({
        where: {
            id: bidId
        }
    });
}


module.exports = placeBid