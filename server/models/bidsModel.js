const { s } = require('framer-motion/client');
const prisma = require('../db');

const getAllBidsModel = async (limit) => {
    const rows = await prisma.bids.findMany({
        where: {
            bidSold: null
        },
        orderBy: {
            posted: 'desc'
        },
        take: limit
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
        },
        orderBy: {
            posted: 'desc'
        }
    })

    return rows;
}

const getBidByIdModel = async (bidId) => {
    const row = await prisma.bids.findUnique({
        where: {
            id: bidId
        },
        select: {
            id: true,
            bidItem: true,
            startingBid: true,
            highestBid: true,
            posted: true,
            bid_duration: true,
            startTime: true,
            category: true,
            userId: true,
            bid_host: {
                select: {
                    id: true,
                    username: true,
                }
            },
            bidSold: true
        }
    })

    return row;
}

const postBidModel = async (userId,bidItem,startingBid,startingTime,category,duration) => {
    const bidId = await prisma.bids.create({
        data: {
            userId: userId,
            bidItem: bidItem,
            startingBid: startingBid,
            startTime: startingTime,
            category: category,
            bid_duration: duration
        },
        select: {
            id: true
        }
    })

    return bidId.id;
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