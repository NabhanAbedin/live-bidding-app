const prisma = require('../db');
const {Temporal} = require('@js-temporal/polyfill');

const processCompletedBids = async () => {
  const nowInstant = Temporal.Now.instant();
  const nowDate = new Date(nowInstant.epochMilliseconds);

    const completedBids = await prisma.bids.findMany({
        where: {
            winnerId: {
                not: null
            },
            endTime: {lte: nowDate}
        },
        include: {
            collections: true
        }
    })

    const bidsToAdd = [];

    for (const bid of completedBids) {
        const existsInCollection = bid.collections.some(
            (collection) => collection.bidId === bid.id && collection.userId === bid.winnerId
        );

        if (!existsInCollection) bidsToAdd.push(bid);
    }

    for (const bid of bidsToAdd) {
        await prisma.$transaction([
            prisma.collections.create({
              data: { bidId: bid.id, userId: bid.winnerId }
            }),
            prisma.users.update({
              where: { id: Number(bid.winnerId) },
              data: { currency: { decrement: Number(bid.highestBid) } } 
            }),
            prisma.users.updateMany({
                where: {id: Number(bid.userId)},
                data: {currency: {increment: Number(bid.highestBid)}}
            })
          ]);
    }
}

module.exports = {
    processCompletedBids
}