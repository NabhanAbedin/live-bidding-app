const prisma = require('../db');

const getCollectionModel = async (userId) => {
    const rows = await prisma.collections.findMany({
        where: {
            userId: userId
        },
        select: {
            bidId: true,
            bids: {
                select: {
                    bidItem: true,
                    highestBid: true,
                    startTime: true,
                    category: true
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
            highestBid: true
        }
    })

    return row._sum.highestBid;
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
            highestBid: true
        }
    })

    return rows.reduce((acc, { category, _sum: { highestBid } }) => {
        acc[category] = highestBid ?? 0;
        return acc;
      }, {});

}




module.exports = {
    getCollectionModel,
    addToCollectionModel,
    collectionsTotalSpentModel,
    collectionsCategorizedModel
}