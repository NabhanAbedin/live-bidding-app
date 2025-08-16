const prisma = require('../db');
const {Temporal} = require('@js-temporal/polyfill');

const placeBid = async (bidId, amount, userId) => {
  const nowInstant = Temporal.Now.instant();
  const nowDate = new Date(nowInstant.epochMilliseconds);

    const result = await prisma.bids.updateMany({
        where: {
          id: bidId,
          startTime: {lte: nowDate},
          endTime: {gt: nowDate},
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
      },
      select: {
        highestBid: true,
        winnerId: true
      }
    })
}


module.exports = placeBid