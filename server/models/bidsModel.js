const prisma = require('../db');

const getAllBidsModel = async () => {
    const rows = await prisma.bids.findMany({
        where: {
            bidSold: null
        }
    });

    return rows;
}

const searchBidsModel = async(query) => {
    const rows = await prisma.bids.findMany({
        where: {
            bidSold: null,
            bidItem: {
                contains: query,
                mode: 'insensitive'
            }
        }
    })

    return rows;
}

const getBidByIdModel = async (bidId) => {
    const row = await prisma.bids.findFirst({
        where: {
            id: bidId
        }
    })

    return row;
}

const postBidModel = async (userId,bidItem,startingBid,category,duration) => {
    const bidId = await prisma.bids.create({
        data: {
            userId: userId,
            bidItem: bidItem,
            startingBid: startingBid,
            category: category,
            bid_duration: duration
        },
        select: {
            id: true
        }
    })

    return bidId;
}

const deleteBidModel = async (bidId, userId) => {
    const result = await prisma.bids.deleteMany({
        where: {
            id: bidId,
            userId: userId
        }
    })

    if (result.count === 0) {
        return false;
    }
    return true;
}

const updateBidModel = async (bidId,userId, updatedData) => {
    const row = await prisma.bids.update({
        where: {
            id: bidId,
            userId: userId
        },
        data: updatedData

    })

    return row;
}

module.exports = {
    getAllBidsModel,
    searchBidsModel,
    getBidByIdModel,
    postBidModel,
    deleteBidModel,
    updateBidModel
}