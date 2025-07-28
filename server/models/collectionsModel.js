const prisma = require('../db');

const getCollectionModel = async (userId) => {
    const rows = await prisma.collections.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            bidId: true,
            bids: {
                select: {
                    bidItem: true,
                    startingBid: true,
                    highestBid: true,
                    posted: true,
                    bid_duration: true
                }
            }
        }
    })

    return rows.map(({ id, bidId, bids }) => ({
        id,
        bidId,
        ...bids
      }));
}

const addToCollectionModel = async (bidId, userId) => {
    const row = await prisma.collections.create({
        data: {
            bidId: bidId,
            userId: userId
        }
    })

    return row;
}




module.exports = {
    getCollectionModel,
    addToCollectionModel
}