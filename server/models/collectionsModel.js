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

const collectionsTotalSpentModel = async (userId) => {
    const row = await prisma.bids.aggregate({
        where: {
            collections: {
                some: {
                   userId: userId
                }
            }
        },
        _sum: {
            bidSold: true
        }
    })

    return row;
}

const collectionsCategorizedModel = async (userId) => {
    const rows = await prisma.bids.groupBy({
        by: ['category'],
        where: {
            collections: {
                some: {
                    userId: userId
                }
            }
        },
        _sum: {
            bidSold: true
        }
    })

    return rows.reduce((acc, { category, _sum: { bidSold } }) => {
        acc[category] = bidSold ?? 0;
        return acc;
      }, {});

}




module.exports = {
    getCollectionModel,
    addToCollectionModel,
    collectionsTotalSpentModel,
    collectionsCategorizedModel
}